const fs = require("graceful-fs");
const xml2js = require("xml2js");
require('dotenv').config();

const mapper = require("../src/utils/mapper");
const { Books } = require("../src/models/Books");

const RDF_DIR_PATH = process.env.RDF_DIR_PATH;
const parser = new xml2js.Parser();
let filenames = [];
let sampleRDFText = '';
let sampleRDFJS = '';
let sampleRDFJSON = '';
let bookModel = {};

describe("Prequisites", () => {
    it(`Should exist the given directory ${RDF_DIR_PATH}`, () => {
        const isCacheEpubExists = fs.existsSync(RDF_DIR_PATH);
        expect(isCacheEpubExists).toBe(true);
    });

    it(`Should have RDF files`, () => {
        try {
            filenames = fs.readdirSync(RDF_DIR_PATH);
            if (filenames.length > 3) {
                for(let i=0; i<3; i++) {
                    if (filenames[i] !== '.DS_Store') {
                        expect(fs.existsSync(`${RDF_DIR_PATH}/${filenames[i]}/pg${filenames[i]}.rdf`)).toBe(true);
                    }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    });

    it(`Should able to read a valid RDF file`, () => {
        sampleRDFText = fs.readFileSync(`${RDF_DIR_PATH}/${filenames[1]}/pg${filenames[1]}.rdf`);
    });
});

describe("Parsing", () => {
    it(`Should able to parse via XML2JS`, () => {
        parser.parseString(sampleRDFText, (err, result) => {
            if (err)
                throw new Error("Error parsing RDF text");

            sampleRDFJS = result;
        })
    });

    it(`Should able to convert valid RDF to JSON`, () => {
        sampleRDFJSON = JSON.parse(JSON.stringify(sampleRDFJS));
    });
});

describe("Modeling", () => {
    it(`Should able to convert Book Model`, () => {
        bookModel = mapper.mapRDFToBookModel(sampleRDFJSON);
    });
});

// Validated Keys, but we can also validate data types later
describe("Validation", () => {
    it(`Should have required properties`, () => {
        bookModel = mapper.mapRDFToBookModel(sampleRDFJSON);
        const keys = Object.keys(bookModel);
        expect(keys).toContain("id");
        expect(keys).toContain("title");
        expect(keys).toContain("authors");
        expect(keys).toContain("publisher");
        expect(keys).toContain("publicationDate");
        expect(keys).toContain("language");
        expect(keys).toContain("subjects");
        expect(keys).toContain("rights");
    });
});

// Cleanup data first & insert
describe("Persistence", () => {
    it(`Should able to save bookModel to DB`, async () => {
        const id = bookModel.id;
        await Books.destroy({
            where: {
                id
            }
        });

        await Books.create(bookModel);

        const book = await Books.findOne({
            where: {
                id
            }
        });
    });
});