'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '場所固有のID'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '場所の名前'
      },
      bleUuid: {
        allowNull: true,
        type: Sequelize.STRING,
        default: null,
        comment: 'BLEゲートウェイのUUID'
      },
      bnbSub: {
        allowNull: true,
        type: Sequelize.STRING,
        default: null,
        comment: 'BNB+のsub'
      },
      latitude: {
        type: Sequelize.FLOAT,
        default: 0,
        comment: '場所の緯度'
      },
      longitude: {
        type: Sequelize.FLOAT,
        default: 0,
        comment: '場所の経度'
      },
      description: {
        type: Sequelize.TEXT,
        default: '',
        comment: '場所について'
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
    await queryInterface.dropTable('spots');
  }
};