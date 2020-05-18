import "@babel/polyfill";
import xml2js from "xml2js";
import dotenv from "dotenv";
import fs from "graceful-fs";
import { fsReadFileAsync, getFileNames } from "#root/utils/helpers";
import mapper from "#root/utils/mapper";

// Load env variables
dotenv.config();

// Load DB settings
import ("#root/db");

const parser = new xml2js.Parser();
const { Books } = require("./models/Books");
const RDF_DIR_PATH = process.env.RDF_DIR_PATH;

if (!fs.existsSync(RDF_DIR_PATH)) {
    console.log(`Error: Directory ${RDF_DIR_PATH} doesn't exists`);
    process.exit();
}

console.log('----------------------------------------------');
console.log('GUTENBERG METADATA EXTRACTOR');
console.log('----------------------------------------------');

// Read all the filenames synchronously
const filenames = getFileNames(RDF_DIR_PATH);

// Get all the filepromises
const fileReadPromises = [];
filenames.map((f) => {
    if (f !== '.DS_Store') {
        fileReadPromises.push(fsReadFileAsync(`${RDF_DIR_PATH}/${f}/pg${f}.rdf`, 'utf-8'));
    }
});

console.log(`Found ${fileReadPromises.length} files`);
console.log(`Parsing & Ingesting book data, Please wait...`);

Books.truncate();
console.log(`Truncating books table...`); 

// Process all the read file promises (1: Parse, 2: Create model, 3: Save to DB)
// NOTE:
// 1) Batch by Batch processing would also fit this scenario (But I use in case if we have millions of files)
// 2) I didnt use Node Streaming because file sizes were small
// 3) Configured DB & Node to handle connection timeouts and heap memory size
// 4) Required columns are Indexed & enabled FULL TEXT SEARCH
console.time(`It took`);
Promise.all(fileReadPromises)
    .then((files) => {
        files.forEach((file) => {
            
            // Parse RDF text via XML2JS
            parser.parseString(file, async (err, result) => {
                if (err) {
                    console.log(`Error parsing file ${file}`, err);
                    return;
                }

                try {
                    const rdfJSON = JSON.parse(JSON.stringify(result));

                    const book = mapper.mapRDFToBookModel(rdfJSON);
        
                    if (book) {
                        await Books.create(book);
                        console.log(`Saved book [#ID:${book.id}] data to the DB`); 
                    }

                } catch (e) {
                    console.log(`Error during JSON parsing | Book Modeling`, e);
                }
            })
        });
        console.timeEnd(`It took`);
    })
    .catch(e => console.log(e));