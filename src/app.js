import "@babel/polyfill";
import fs from "fs";
import util from "util";
import xml2js from "xml2js";
import dotenv from "dotenv";

dotenv.config();

import ("#root/db");

const parser = new xml2js.Parser();

const { Books } = require("./models/Books");

fs.readFile(__dirname + '/../cache/epub/61799/pg61799.rdf', (err, data) => {
    parser.parseString(data, (err, result) => {
        // console.log(util.inspect(result, false, null));
        const rJson = JSON.parse(JSON.stringify(result));

        const rawEbook = rJson['rdf:RDF']['pgterms:ebook'][0];
        const ebook = {
            id: rawEbook['$']['rdf:about'],
            title: rawEbook['dcterms:title'],
            authors: rawEbook['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'],
            publisher: 'Project Gutenberg',
            publicationDate: rawEbook['dcterms:issued'][0]._,
            language: rawEbook['dcterms:language'][0]['rdf:Description'][0]['rdf:value'][0]._,
            subjects: rawEbook['dcterms:subject'],
            rights: rawEbook['dcterms:rights'][0],
        }

        console.log(ebook);

        //const books = Books.findAll();
        //console.log(books);

        console.log('Done');
    })
});