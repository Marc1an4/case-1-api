import { DataTypes, Model, Sequelize } from "sequelize";

class Product extends Model {
  public id!: number;
  declare name: string;
  declare description: string | null;
}

const initProduct = (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "products",
      schema: "public",
      timestamps: false,
    }
  );

  return Product;
};

export { Product, initProduct };

