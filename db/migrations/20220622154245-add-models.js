'use strict';

const { DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('../models/product.module');
const { STORE_TABLE } = require('../models/store.module');
const { USER_TABLE } = require('../models/user.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      region: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isBlock: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: "is_block",
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(STORE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        aallowNull: false,
        type: DataTypes.STRING,
      },
      region: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: ''
      },
      logo: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      isBlock: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_block',
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addColumn(USER_TABLE, 'name', {
      allowNull: false,
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'region', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ''
    });
    await queryInterface.addColumn(USER_TABLE, 'description', {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: ''
    });
    await queryInterface.addColumn(USER_TABLE, 'image', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ''
    });
    await queryInterface.addColumn(USER_TABLE, 'is_block', {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'is_block',
      defaultValue: false,
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(STORE_TABLE);

    await queryInterface.removeColumn(USER_TABLE, 'name');
    await queryInterface.removeColumn(USER_TABLE, 'region');
    await queryInterface.removeColumn(USER_TABLE, 'description');
    await queryInterface.removeColumn(USER_TABLE, 'image');
    await queryInterface.removeColumn(USER_TABLE, 'is_block');
  }
};
