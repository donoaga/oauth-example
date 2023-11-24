import { Client } from "pg";
import "dotenv/config";

const client: Client = new Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: +process.env.DATABASE_PORT | 5432,
});

export const connection = async () => {
  try {
    client.connect(function (err) {
      if (err) throw err;
      console.log("Connected to db!");
      afterConnected();
    });
  } catch {
    console.log("Error connceting to DB");
  }
};

const afterConnected = async () => {
  try {
    client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    client.query("DROP TABLE IF EXISTS users");

    client.query(`CREATE TABLE IF NOT EXISTS "users" (
	    "id" UUID DEFAULT uuid_generate_v4(),
	    "username" VARCHAR(100) NOT NULL,
      "password" VARCHAR NOT NULL,
      PRIMARY KEY ("id")
    );`);
  } catch (e) {
    console.error(e, "error");
  }
};

export const db = client;
