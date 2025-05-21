import express, { Request, Response } from "express";
import cors from "cors";
import { sequelize, initModels } from "./db/conection";
import productRouter from "./routes/productRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

if (process.env.DB_HOST) {
  console.log("DB_HOST is set");
  const startServer = async () => {
    await sequelize.authenticate();
    initModels();
    console.log("Connection has been established successfully.");
  };
  startServer();
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});