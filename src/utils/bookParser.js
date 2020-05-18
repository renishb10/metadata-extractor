// A recursive check function can be a better fit, but has to address all scenario, so for time being created standalone methods.

class BookParser {
    getId(rdfAbout) {
        return rdfAbout.split('/')[1];
    }

    getAuthorNames(rdfCreator) {
        if (Array.isArray(rdfCreator) && rdfCreator.length > 0) {
            const agent = rdfCreator[0]['pgterms:agent'];
            if (Array.isArray(agent) && agent.length > 0) {
                const authors = agent[0]['pgterms:name'];
                return authors.join(',');
            }
        }
    }

    getSubjects(rdfSubjectArray) {
        if (rdfSubjectArray) {
            const subjects = rdfSubjectArray.map(s => {
                return s['rdf:Description'][0]['rdf:value'][0];
            });
    
            return subjects.join(',');
        }
    }

    getLanguage(rdfLanguage) {
        if (Array.isArray(rdfLanguage) && rdfLanguage.length > 0) {
            return rdfLanguage[0]['rdf:Description'] 
                ? rdfLanguage[0]['rdf:Description'][0]['rdf:value'][0]._
                : null;
        }
    }

    arrayToString(rdfArray) {
        if (Array.isArray(rdfArray))
            return rdfArray.join(',');
    }

    stringToDate(rdfDate) {
        return new Date(rdfDate);
    }
};

module.exports = BookParser;