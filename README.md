# Audiobook

Audiobook is a TypeScript-based API project designed to serve as a foundation for a multimedia application. The goal is to eventually provide services like converting PDFs or text to audio, translating audio to text, and even answering questions using AI. For now, the core focus is on secure user authentication, built with modern tools and best practices.

## Project Overview

This project includes:
- **User Authentication:** Users can sign up, log in, and log out.
- **Database Integration:** Uses PostgreSQL (with Sequelize ORM) to store user data.
- **Password Security:** Passwords are hashed using bcrypt.
- **Token-Based Auth:** JWTs are used for stateless authentication (tokens expire after 30 days).

## What I Did

### 1. Project Initialization
- **Directory Setup & NPM Initialization:**  
 I initialized it with `npm init -y` to generate a `package.json`.
  
- **Installing Dependencies:**  
  I installed essential packages:
  - **Express & CORS:** For building the web server and handling cross-origin requests.
  - **dotenv:** To manage environment variables.
  - **Sequelize & pg:** To connect and interact with a PostgreSQL database.
  - **bcrypt:** For securely hashing passwords.
  - **jsonwebtoken:** To create and verify JWT tokens.
  
  We also installed TypeScript and related tools (ts-node, nodemon, and type definitions) for a type-safe development environment.

### 2. TypeScript Configuration
- I set up TypeScript by running `npx tsc --init` and created additional config files (`tsconfig.dev.json` and `tsconfig.prod.json`) to handle different build environments.
- These configurations ensure our code compiles correctly for both development and production.

### 3. Database Configuration with Sequelize
- **PostgreSQL Setup:**  
  Using environment variables in a `.env` file (e.g., `DB_URL_DEV`, `DB_HOST`, etc.), I connected to our local PostgreSQL database.
  
- **Sequelize Integration:**  
  In `/src/config/databaseConfig.ts`, I configured Sequelize to establish a connection to PostgreSQL. This file is responsible for authenticating the connection and handling any connection errors.

### 4. User Model Creation
- In `/src/models/userModel.ts`, we defined the `User` model using Sequelize.  
  This model includes:
  - **id:** A UUID that uniquely identifies each user.
  - **name, phone_number, email, password:** Essential user data.
  - **deleted:** A boolean flag to mark if a user has been "soft-deleted".
  
  The model syncs with the PostgreSQL database, ensuring that the necessary table is created or updated as needed.

### 5. Password and Token Utilities
- **Password Hashing:**  
  In `/src/config/bcrypt.ts`, I implemented functions to hash and verify passwords using bcrypt. This ensures that user passwords are stored securely.
  
- **JWT Token Generation:**  
  In `/src/config/token.ts`, I created functions to generate and verify JWT tokens. Tokens are set to expire in 30 days, providing secure, stateless authentication. These tokens will be used to authenticate API requests.

### 6. User Service Implementation
- **User Service:**  
  Instead of controllers, I built a user service in `/src/services/userService.ts` that directly handles:
  - **Signup:** Validates user data, checks for existing users, hashes the password, creates a new user, and generates a JWT token.
  - **Login:** Verifies user credentials, compares passwords, and returns a JWT token upon successful login.
  - **Logout:** For JWT-based authentication, logout is typically managed by the client discarding the token (but we provide a placeholder endpoint).
  
  The service functions use Express’s `req` and `res` objects directly, making it straightforward to integrate them into your route definitions.

## Running the Project

### Development Mode
To run the project in development mode with live reloading, use:
```bash
npm run start:dev

### Production Mode
First, compile the TypeScript code:
```
npm run build:prod
Then start the server:
```
npm run start:prod

### Future Plans
Integrate file upload endpoints for PDFs and audio files.
Implement text-to-speech and speech-to-text functionalities.
Add AI-powered Q&A capabilities.
Enhance security with additional features like token blacklisting.