const fs = require("fs");
const util = require("util");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

fs.readFile(__dirname + '/cache/epub/61799/pg61799.rdf', (err, data) => {
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

        console.log('Done');
    })
});
