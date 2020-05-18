module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("books", {
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
    },
    {
        charset: "utf8",
    })
};

module.exports.down = queryInterface => queryInterface.dropTable("books");