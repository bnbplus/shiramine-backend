'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('keyperson', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'キーパーソンの会話固有のID'
      },
      keypersonId: {
        type: Sequelize.INTEGER,
        comment: 'キーパーソンのID'
      },
      talkUserId: {
        type: Sequelize.INTEGER,
        comment: '旅人のID'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '生成日'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '変更日'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('keypeople');
  }
};