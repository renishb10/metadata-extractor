module.exports = {
    async up(queryInterface) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.addIndex(
            'Books',
            ['authors']
        );
        await queryInterface.addIndex(
            'Books',
            ['publicationDate']
        );
        await queryInterface.addIndex(
            'Books',
            ['authors','publicationDate']
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