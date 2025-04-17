# User Authentication Project

A user authentication system with sign-up, login, and JWT-based user authentication built using **NestJS** for the backend and **React** for the frontend.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
  - [Error Handling](#error-handling)
  - [JWT Authentication](#jwt-authentication)
  - [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
- [Folder Structure](#folder-structure)
- [Environment Setup](#environment-setup)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies Used

- **Backend**: NestJS, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend**: React, Axios

## Features

- User sign-up and login with validation
- JWT-based authentication for secure access
- Profile retrieval using JWT token

---

## Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/olaahmedabouraya/user-authenticator.git

2. Navigate to the project folder and install dependencies:

    cd user-authenticator-api
    npm install

3. Create a .env file in the root of the backend folder and add the following variables:
    JWT_SECRET=your-secret-key
    JWT_EXPIRATION=3600s
    MONGO_URI=mongodb://localhost:27017/user-authenticator
    PORT=3001

4. Start the backend server:
    npm run start:dev

### Frontend Setup

1. cd user-authentication-app-ts
2. npm install
3. npm start

---

# API Documentation

## Endpoints

- **POST /users/signup**: Register a new user.
- **POST /users/login**: Log in and get a JWT token.
- **GET /users/me**: Get the authenticated user's profile (requires JWT token).

---

## Error Handling

The backend implements custom error handling, providing meaningful error messages and status codes.

- **USER_NOT_FOUND**: The user was not found during login.
- **INVALID_CREDENTIALS**: Invalid login credentials.
- **USERNAME_ALREADY_EXISTS**: The username already exists during sign-up.
- **INVALID_PASSWORD_INPUT**: Password does not meet the required criteria.

---

## JWT Authentication

JWT tokens are used for authentication. After logging in, the server responds with a token that should be sent in the `Authorization` header of future requests to protected routes.

---

## Data Transfer Objects (DTOs)

- **CreateUserDto**: DTO for creating a new user (`name`, `email`, `password`).
- **LoginUserDto**: DTO for logging in (`email`, `password`).

# Project Structure

The following is the directory structure of the project:

src/ ├── Constants/ │ ├── error.ts // Error messages and constants │ └── regex.ts // Regex patterns for validation ├── DataTransferObjects/ // DTOs for user sign-up and login │ ├── create-user.dto.ts │ └── login-user.dto.ts ├── Exceptions/ // Custom exception handling │ └── custom-exception.ts ├── Guards/ // Auth guards │ └── auth-guard.ts ├── Http/ │ ├── Controllers/ // User-related controllers │ │ └── users.controller.ts │ └── Requests/ // User schema and entity │ └── user.entity.ts ├── Interfaces/ // Interfaces for payload and error details │ ├── error-detail.ts │ └── payload.ts ├── Modules/ // Modules to group related features │ └── users.module.ts ├── Services/ // Business logic │ └── users.service.ts ├── app.module.ts // Root module of the app └── main.ts // Entry point for the app