const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db");

class Books extends Model {}
Books.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    title: {
        type: DataTypes.STRING(1275)
    },

    authors: {
        type: DataTypes.STRING,
    },

    publisher: {
        allowNull: false,
        type: DataTypes.STRING,
    },

    publicationDate: {
        allowNull: false,
        type: DataTypes.DATE,
    },

    language: {
        type: DataTypes.STRING,
    },

    subjects: {
        type: DataTypes.STRING(1275),
    },

    rights: {
        allowNull: false,
        type: DataTypes.STRING,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    modelName: "books",
    sequelize,
    indexes: [
        {
            // Indexing publicationDate (Usefull when used BETWEEN queries)
            fields: ['title']
        },
        {
            // Indexing publicationDate (Usefull when used BETWEEN queries)
            fields: ['authors']
        },
        {
            // Indexing publicationDate (Usefull when used BETWEEN queries)
            fields: ['publicationDate']
        },
        {
            // Indexing publicationDate (Usefull when used BETWEEN queries)
            fields: ['authors', 'title', 'publicationDate']
        }
    ]
});

module.exports = {
    Books,
}