const BookParser = require("./bookParser"); //used commonjs require because of test dependency (babel not configured)
const bookParser = new BookParser();

const mapRDFToBookModel = (rdfJSON) => {
    try {
        const rawBook = rdfJSON['rdf:RDF']['pgterms:ebook'][0];
        const book = {
            id: bookParser.getId(rawBook['$']['rdf:about']),
            title: bookParser.arrayToString(rawBook['dcterms:title']),
            authors: bookParser.getAuthorNames(rawBook['dcterms:creator']),
            publisher: 'Project Gutenberg',
            publicationDate: bookParser.stringToDate(rawBook['dcterms:issued'][0]._),
            language: bookParser.getLanguage(rawBook['dcterms:language']),
            subjects: bookParser.getSubjects(rawBook['dcterms:subject']),
            rights: bookParser.arrayToString(rawBook['dcterms:rights']),
        }

        return book;
    } catch (e) {
        console.log(e);
        return;
    }
};

module.exports = {
    mapRDFToBookModel
};