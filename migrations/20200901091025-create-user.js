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
        values: ['traveller', 'admin', 'keyperson'],
        comment: 'ユーザの立場(旅人,管理者,キーパーソン)'
      },
      bleToken: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: 'BLEタグのUUID'
      },
      bnbplusApiToken: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: 'bnb+のoidcトークン'
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