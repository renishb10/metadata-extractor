module.exports = {
    async up(queryInterface) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.sequelize.query(
          `ALTER TABLE Books ADD FULLTEXT(title)`
        );
        await queryInterface.sequelize.query(
          `ALTER TABLE Books ADD FULLTEXT(authors)`
        );
        await queryInterface.sequelize.query(
            `ALTER TABLE Books ADD FULLTEXT(title,authors)`
        );
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    },
    async down(queryInterface) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }
  };