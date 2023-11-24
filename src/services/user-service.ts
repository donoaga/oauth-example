import { db } from "../core/database";
import { User } from "../models/user";

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const res = await db.query<User>(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    if (!res.rows.length) {
      throw new Error("Error when registering user");
    }

    return res.rows[0];
  } catch (e) {
    console.error("Error when creating user", e);
    throw "Error when creating user";
  }
};

export const findUser = async (username: string): Promise<User> => {
  try {
    const res = await db.query<User>(
      `SELECT * FROM users WHERE username=($1)`,
      [username]
    );

    return res.rows[0];
  } catch (e) {
    throw "Error when find user";
  }
};
