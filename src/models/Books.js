import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

export class Books extends Model {}
Books.init({
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
}, {
    modelName: "books",
    sequelize
});