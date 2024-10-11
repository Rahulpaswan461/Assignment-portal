# Assignment  Portal

This is a Node.js backend application for an assignment submission portal. It supports two types of users: Users and Admins. Users can register,
log in, and upload assignments. Admins can register, log in, view assignments assigned to them, and either accept or reject those assignments.

## Features
- User registration and login (for both Users and Admins)
- Assignment uploads by users
- Admins can view, accept, or reject assignments tagged to them
- MongoDB used as the database
- Authentication and authorization using JWT

## Table of Contents
- Getting Started
- Environment Variables
- API Endpoints
- Technologies Used
- License

## Getting Started
 To get the backend service running on your local machine, follow these instructions.

 ### Prerequisites
 - Node.js (v12 or later)
 - MongoDB
 - Git

## Installation
1. Clone the repository:
   git clone https://github.com/Rahulpaswan461/Assignment-portal.git
2. Navigate to the project directory:
   cd assignment-portal
3. Install the dependencies:
    npm install
4. Set up the environment variables:
    - JWT_SECRET = your-secret-key
    - PORT = port-number
    - MONGO_URI = your-mongodb-url
5. Start the server:
   npm start

   - The server should now be running on the specified port (from the .env file). You can access the API at http://localhost: port.
  

## Environment Variables

-  In order to run this project, you will need to add the following environment variables to your .env file:

- JWT_SECRET: The secret key used to sign and verify JWT tokens for authentication.
- PORT: The port number on which the server will run (default: 3000 if not specified).
- MONGO_URL: MongoDB connection URL.

  
 ### Example .env file:
- JWT_SECRET=mySuperSecretKey
- PORT=3000
- MONGO_URL=mongodb://localhost:27017/assignment-portal

  ## API Endpoints
   ### User Endpoints
   1. POST /register:
     - Register a new user or admin.
     - Request Body:
      {
        "name": "your-name",
        "email": "your-email",
        "password": "your-password",
        "role": "user" // or "admin"
 
      }
  
   2. POST /login:
     - Log in as a user or admin.
     - Request Body:
      {
        "email": "your-email",
        "password": "your-password"
 
      }
  
   3. POST /upload:
      - Upload an assignment (user).
      - Request Body:
      {
        "task": "your-task",
        "adminId": "admin-id"
     
      }
      
   5. GET /admins: 
     - Fetch all admins.

  ### Admin Endpoints
  1. GET /assignments:
     - Get all assignments tagged to the admin.
       
  2. POST /assignments/
    - /accept:
    - Accept an assignment by its ID.
      
  3. POST /assignments/
    - /reject:
    - Reject an assignment by its ID.

 ## Technologies Used
- Node.js: JavaScript runtime for building fast, scalable network applications.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database for storing users, admins, and assignments.
- Mongoose: ODM library for MongoDB and Node.js.
- JWT: Used for authentication and authorization.
- dotenv: For managing environment variables.

  ## License
  This project is licensed under the MIT License - see the LICENSE file for details.
