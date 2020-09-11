'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '頼みごと固有のid'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '頼んだ人のユーザID'
      },
      information: {
        allowNull: false,
        default: '',
        type: Sequelize.TEXT,
        comment: '頼む内容'
      },
      solutioner: {
        allowNull: true,
        default: null,
        type: Sequelize.INTEGER,
        comment: '頼みごとを解決した人のユーザID'
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
    await queryInterface.dropTable('requests');
  }
};