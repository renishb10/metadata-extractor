module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("books", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },

        authors: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        authors: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        publisher: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        publicationDate: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        language: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        subjects: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        rights: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    },
    {
        charset: "utf8"
    })
};

module.exports.down = queryInterface => queryInterface.dropTable("books");

/* 
            id: rawEbook['$']['rdf:about'],
            title: rawEbook['dcterms:title'],
            authors: rawEbook['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'],
            publisher: 'Project Gutenberg',
            publicationDate: rawEbook['dcterms:issued'][0]._,
            language: rawEbook['dcterms:language'][0]['rdf:Description'][0]['rdf:value'][0]._,
            subjects: rawEbook['dcterms:subject'],
            rights: rawEbook['dcterms:rights'][0],
*/