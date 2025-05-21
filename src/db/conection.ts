import { Sequelize } from "sequelize";
import { env } from "../config/envConfig";
import { initProduct } from "../models/product";

let sequelize: Sequelize;
let initModels: () => void;

if (process.env.DB_HOST) {
  sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: "postgres",
    port: env.DB_PORT,
  });

  initModels = () => {
    initProduct(sequelize);
  };
}

export { sequelize, initModels };
