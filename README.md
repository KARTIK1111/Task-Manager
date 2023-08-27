## TODO List Project using Nodejs,Express,MongoDB,jsonwebtoken,Mongoose

## Description
Todo List Project is all about Implimentation of RESTful API for managing a Todo list using MongoDB and Mongoose. Users can create, read, update, and delete Tasks OR Todo items. The API is built using Node.js, Express.js, MongoDB, and Mongoose. and used jsonwebtoken for authorization


## Table of contents
- [Setup](#setup)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
  - [GET /todolist](#get-todolist)
  - [GET /task/:Id](#get-taskId)
  - [POST /task](#post-task)
  - [PUT /task/:Id](#put-taskId)
  - [DELETE /task/:Id](#delete-taskId)
  - [POST /user](#post-User)
  - [POST /login](#post-login)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [License](#license)


## Setup
1. Clone this repository:
   ```bash
   git clone [<repository-url>]((https://github.com/KARTIK1111/Task-Manager.git))
   ```


2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the necessary environment variables in a `.env` file (see [Environment Variables](#environment-variables)).

4. Run the API:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:3000`.



## Database Configuration
1. Ensure you have a running MongoDB instance.
2. Set up environment variables in a `.env` file:

        PORT=API server port. (Default: 3000)
        MONGO_URL=your-mongodb-url
        SECRET_KEY=your-secret-key

...




## API endpoints

### GET /todolist
Retrieve a list of all Todo items.

**Response:**

```json

    {
    "status": true,
    "message": "Task List",
    "data": {
        "_id": "64e0da07edd909260abf3146",
        "title": "Go for a run",
        "description": "Run for 30 minutes in the park",
        "status": false,
        "createdAt": "2023-08-19T15:04:39.554Z",
        "updatedAt": "2023-08-19T15:04:39.554Z",
        "__v": 0
    }
}
``
[

  // ... more todo items
]
```


### GET /task/:Id

Retrieve a specific Todo item by ID.

**Parameters:**
- `id`: Todo item ID

**Response:**
```json
{
    "status": true,
    "message": "taskDetail:",
    "data": {
        "_id": "64e9e57df884c5f301480123",
        "taskname": "to do 1",
        "description": "1.sugar 2.oil 3.tea",
        "taskstatus": "pending",
        "createdAt": "2023-08-26T11:43:57.632Z",
        "updatedAt": "2023-08-26T11:43:57.632Z",
        "__v": 0
    }
}

```


## POST /task

Create a new Todo item.

**Request Body:**
```json
{
    "taskname":"to do 1",
    "description":"1.sugar 2.oil 3.tea 4.cookies"
}
```

**Response:**
```json
{
    "status": true,
    "message": "Task Created",
    "data": {
        "taskname": "to do 1",
        "description": "1.sugar 2.oil 3.tea 4.cookies",
        "taskstatus": "pending",
        "_id": "64e9f16237ee6885eae643cb",
        "createdAt": "2023-08-26T12:34:42.390Z",
        "updatedAt": "2023-08-26T12:34:42.390Z",
        "__v": 0
    }
}

```

### PUT /task/:Id
Update an existing Todo item.

**Parameters:**
- `id`: Todo item ID

**Request Body:**
```json
{
    "description":"1.sugar 2.oil 3.tea 4.Chips"
}
```

**Response:**
```json
{
    "status": true,
    "message": "Task updated",
    "data": {
        "_id": "64e9f14837ee6885eae643c9",
        "taskname": "to do 1",
        "description": "1.sugar 2.oil 3.tea 4.Chips",
        "taskstatus": "pending",
        "createdAt": "2023-08-26T12:34:16.739Z",
        "updatedAt": "2023-08-26T12:43:13.219Z",
        "__v": 0
    }
}

```

### DELETE /task/:Id
Delete a Todo item.

**Parameters:**
- `id`: Todo item ID

**Response:**

```json
{
    "status": true,
    "message": "task is deleted"
}
```


### POST /user
Register a new user.

**Request Body:**
```json
{
    "username":"robert",
    "email":"robert2@email.com",
    "password":"Robert@123"
}
```

**Response:**
```json
{
    "status": true,
    "message": "user created",
    "userdata": {
        "username": "robert",
        "email": "robert2@email.com",
        "password": "$2b$10$94oSQzcRwWmWTW15wQcV3umIqjHp30t7krWYfmukc.Nq.xskb3di2",
        "_id": "64e9f64859dce1582fe9b05a",
        "createdAt": "2023-08-26T12:55:36.273Z",
        "updatedAt": "2023-08-26T12:55:36.273Z",
        "__v": 0
    }
}
```



### POST /login
User login.

**Request Body:**
```json
{
    "email":"robert2@email.com",
    "password":"Robert@123"
}
```
**Response:**
```json
{
    "staus": true,
    "message": "User login Successfully"
}
```



## Authentication
This API requires authentication using JSON Web Tokens (JWT). Users need to register and log in to obtain a JWT token for accessing protected routes.


## Password Hashing
User passwords are securely hashed using the bcrypt library before being stored in the database. This adds an extra layer of security to protect user data.




## Environment Variables
Before running the project, you need to set up the following environment variables in a `.env` file:

- `PORT`: The port on which the API server will listen. (Default: 3000)

- `MongoDB`: MongoDB connection URL.

- `SECRET_KEY`: Secret key used for generating and verifying JSON Web Tokens (JWT) for authentication.

Example `.env` file:

```Plaintext:-
PORT=3000
MongoDB=mongodb://localhost:27017/your-database-name
SECRET_KEY=my-secret-key
```

## Running the Project
1. Run the API:
   ```bash
   npm start
   ```

2. Access the API at `http://localhost:3000`.



## Testing
To run tests, execute:
```bash
npm test
```


## License
This project is licensed under the MIT License. ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

