"use strict";
const { Model, UUIDV4, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      titleArticle: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      bodyArticle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Article",
      createdAt: true,
      updatedAt: true,
    }
  );
  return Article;
};
