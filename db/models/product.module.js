const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.module');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
};

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
