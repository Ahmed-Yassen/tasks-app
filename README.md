
# Tasks App

A Node RESTful API that enables users to add tasks to their todo list.

Technologies Used: Node.js - Express.js - JavaScript - MongoDB - Mongoose - Jest


## Features

- CRUD Operations for Users & Tasks using Mongoose.
- Validation & Sanitization of Data with Mongoose & Express-Validator
- Securely Storing Passwords with bcryptjs
- Authorization & Authentication with JWT.
- Sorting, Filtering & Pagination.
- File Uploads with Multer.
- Resizing Images with Sharp.
- Sending Emails with SendGrid
- Unit Testing with Jest.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Ahmed-Yassen/tasks-app.git
```

Go to the project directory

```bash
  cd tasks-app
```

Install dependencies

```bash
  npm install
```

Create config directory

```bash
  mkdir config
```

Go to the config directory & create env files for development & tests

```bash
cd config
touch dev.env test.env 
```
In each env file add the following variables & their values

```bash
  PORT= **the available port number on your machine**
  SENDGRID_API_KEY= **your sendgrid api key**
  JWT_SECRET= **your jwt secret**
  MONGODB_URL= **the url to your mongodb server with the database name of your choice**
```

Go back to the root directory

```bash
  cd ..
```

Start the server

```bash
  npm run start
```

Run the tests (optional)

```bash
  npm run test
```


## API Documentation

### **-- Auth Routes --**
#### Create a new user and sign in

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. should be valid email that contains @ and domain|
| `password` | `string` | **Required**. should contain only numbers & letters, min length 8 characters |
| `name` | `string` | **Required**. Your name |
| `age` | `number` | **Optional**. Your age, should be atleast 10 |

#### Sign in as an existing user

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. should be valid email that contains @ and domain|
| `password` | `string` | **Required**. should contain only numbers & letters|

#### Log user device out (*requires authentication*)

```http
  POST /api/auth/logout
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

#### Log all user devices out (*requires authentication*)

```http
  POST /api/auth/logoutall
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |


###  **-- User Routes --**
 
#### Get current user profile (*requires authentication*)

```http
  GET /api/users/profile
```
#### Update current user profile (*requires authentication*)

```http
  PATCH /api/users/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Optional**. should be valid email that contains @ and domain|
| `password` | `string` | **Optional**. should contain only numbers & letters|
| `name` | `string` | **Optional**. Your name |
| `age` | `number` | **Optional**. Your age, should be atleast 10 |

#### Remove user profile (*requires authentication*)

```http
  DELETE /api/users/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

#### Upload user profile image (*requires authentication*)

```http
  POST /api/users/profileImage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image` | `file` | **Required**. should be an image, with (.png / .jpg / .jpeg) extention|

#### Remove user profile image (*requires authentication*)

```http
  DELETE /api/users/profileImage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

###  **-- Task Routes --**

#### Create task for current user (*requires authentication*)

```http
  POST /api/tasks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `description` | `string` | **Required**. The task's description|
| `isCompleted` | `boolean` | **Optional**. Whether or not the task has been completed. (defaults to false)|

#### Get all current user tasks (*requires authentication*)

```http
  GET /api/tasks
```

#### Get only the completed tasks (*requires authentication*)

```http
  GET /api/tasks?isCompleted=true
```

#### Get the tasks sorted by description, completion or creation date (*requires authentication*)

```http
  GET /api/tasks?sortBy=description:asc
```

```http
  GET /api/tasks?sortBy=createdAt:desc
```

```http
  GET /api/tasks?sortBy=isCompleted:asc
```
#### Get only a limited number of tasks (*requires authentication*)
```http
  GET /api/tasks?limit=3
```

#### Get tasks after skipping a number of tasks (*requires authentication*)
```http
  GET /api/tasks?skip=3
```

#### Update a user's task (*requires authentication*)

```http
  PATCH /api/tasks/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `mongoId` | **Required**. The task's id|
| `description` | `string` | **Optional**. The task's description|
| `isCompleted` | `boolean` | **Optional**. Whether or not the task has been completed. (defaults to false)|

#### Remove a user's task(*requires authentication*)

```http
  DELETE /api/tasks/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `mongoId` | **Required**. The task's id|

## Feedback

If you have any feedback, please reach out to me at ahmed.ibrahim.yassen@gmail.com

