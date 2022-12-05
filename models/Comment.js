const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment')

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comment_creator: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,                 
    get() {
          return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
      }
  },
  updatedAt: {
      type: DataTypes.DATE,
      get() {
          return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
      }
  }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;