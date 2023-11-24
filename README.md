# OAuth2 Example with Node.js and TypeScript

This repository provides a simple OAuth2 example implemented with Node.js and TypeScript.

## Key Packages

- **Express:** A fast, unopinionated, minimalist web framework for Node.js that is widely used for building web applications.

- **jsonwebtoken:** Enables the creation and verification of JSON Web Tokens (JWT), essential for secure authentication in OAuth2 flows.

- **bcryptjs:** A library for hashing passwords, adding a layer of security to user authentication.

- **body-parser:** Middleware to parse incoming request bodies in a middleware before handling, facilitating the handling of POST requests.

- **dotenv:** A zero-dependency module for loading environment variables from a .env file into process.env, essential for storing sensitive information.

- **pg:** A PostgreSQL client for Node.js, used for interacting with a PostgreSQL database.

- **nodemon:** Monitors for changes in files and automatically restarts the server, streamlining the development process.

## Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables to the `.env` file:
   - `SECRET_KEY`
   - `DATABASE_USER`
   - `DATABASE_HOST`
   - `DATABASE_NAME`
   - `DATABASE_PASSWORD`
   - `DATABASE_PORT`

## How to Start

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:3000` in your browser to access the application.

## Linting

Lint the codebase with: `npm run lint`

Feel free to explore and modify this example to suit your OAuth2 implementation needs.
