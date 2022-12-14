const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment')

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_creator: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,                 
    get() {
          return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY');
      }
  },
  updatedAt: {
      type: DataTypes.DATE,
      get() {
          return moment(this.getDataValue('updatedAt')).format('MM/DD/YYYY');
      }
  }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;