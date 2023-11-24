import { Request, Response } from "express";
import { User } from "../models/user";
import * as userService from "../services/user-service";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export const register = async ({ body: user }: Request, res: Response) => {
  try {
    const { username, password } = user;
    // Validate user credentials example
    // Alternatively to if-else you can use `class-validators`
    if (!password || !username) {
      throw new Error("Username or password is not specified.");
    }

    // check if user exists
    const existingUser: User | undefined = await userService.findUser(username);

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Password should be encrypted before saving into db
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser: User = await userService.createUser(
      username,
      passwordHash
    );
    if (!createdUser) {
      throw new Error("Failure occured when creating user.");
    }
    res.json("User created"); // In our case let's just return an message
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json(e.message);
    } else {
      res.status(500).json(e);
    }
  }
};

export const login = async ({ body }: Request, res: Response) => {
  try {
    const { username, password } = body;

    if (!password || !username) {
      throw new Error("Username or password is not specified.");
    }

    const foundUser: User = await userService.findUser(username);

    if (!foundUser) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (isPasswordCorrect) {
      const token: string = jwt.sign(
        { user_id: foundUser.id, username },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("Authorisation", token).json(token);
      return;
    }
    throw new Error("Wong credentials");
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json(e.message);
    } else {
      res.status(500).json(e);
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorisation").json();
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json(e.message);
    } else {
      res.status(500).json(e);
    }
  }
};
