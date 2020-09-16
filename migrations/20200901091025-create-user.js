'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'ユーザ固有のID'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        comment: 'ユーザ固有のメールアドレス'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: 'ユーザの名前'
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['traveller', 'admin', 'villager', 'shop'],
        comment: 'ユーザの立場(旅人,管理者,村人,店舗)'
      },
      bleNumber: {
        allowNull: true,
        type: Sequelize.INTEGER,
        comment: 'BLEタグの番号'
      },
      bnbplusSubject: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: 'bnb+のoidcのsub'
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
    await queryInterface.dropTable('users');
  }
};