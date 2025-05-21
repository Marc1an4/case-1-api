import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

interface Env {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

dotenv.config();

let env: Env;
if (process.env.DB_HOST) {
  env = cleanEnv(process.env, {
    DB_HOST: str(),
    DB_PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
  });
}

export { env };
