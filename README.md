# Modular Node.js API with Auth, User Management & Custom Captcha

A modular Node.js RESTful API project that includes user authentication, user profile management, and a custom-built captcha system — all without relying on external packages for JWT or captcha generation.

## 📁 Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── default.js
│   └── db/
│       └── mongoose.js
├── middlewares/
│   ├── errorHandler.js
│   ├── validation.js
│   └── guard/
│       ├── auth.guard.js
│       └── captcha.guard.js
├── services/
│   └── redis.service.js
├── modules/
│   ├── auth/
│   │   ├── auth.routes.js
│   │   └── auth.controller.js
│   ├── users/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.model.js
│   │   └── user.validation.js
│   └── captcha/
│       ├── captcha.routes.js
│       └── captcha.controller.js
├── utils/
│   ├── captcha.util.js
│   ├── password.util.js
│   └── token.util.js
```

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Redis** – Used for storing refresh tokens and captcha data
- **JWT (custom implementation)**
- **Custom captcha generator**
- **Joi** – For input validation

## 🛡 Authentication (`/auth`)

Authentication is handled using **JWT**, implemented manually without third-party packages.

### Features:
- `POST /auth/register` – User registration
- `POST /auth/login` – User login and access/refresh token generation
- `POST /auth/logout` – Invalidate session or tokens
- `POST /auth/refresh-token` – Issue a new access token using a refresh token

> ✅ Access to protected routes requires a valid `accessToken` in the `Authorization` header.

## 👤 User Module (`/users`)

### Features:
- `PUT /users/` – Update user profile  
  ✅ Requires user to be **authenticated** (via accessToken)  
  ✅ Requires a **valid captcha** solution in the request body

> Access is denied if the user is not logged in or the captcha is invalid.

## 🔐 Captcha System (`/captcha`)

A custom-built captcha mechanism designed without any external libraries.

### Flow:
1. `GET /captcha/`  
   Returns a randomly generated 5-character captcha string along with an ID.
2. `PUT /users/`  
   When updating the profile, the client must include the correct captcha response corresponding to the provided captcha ID.

> ❗ If the captcha is invalid, the request to update user info will be **rejected**.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm start
```

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (custom implementation)**
- **Custom captcha generator**

## 📌 Notes

- All features are designed with **security and modularity** in mind.
- JWT tokens and captcha logic are implemented **from scratch**.
- The system is designed to be easy to extend with new modules or middleware.

## 📫 Contact

For questions, feel free to open an issue or reach out.
## ⚙️ Environment Variables

Before running the project, create a `.env` file in the root directory and add the following configuration:

```
PORT=3000
#MONGODB
MONGODB_URL=mongodb://127.0.0.1:27017/test5
#REDIS
REDIS_URL=redis://localhost:6379
#TOKEN
SECRET_TOKEN_ACCESS_KEY='s2MY22kdaNNwyT0r9kWkGL4WAGN8KbEaFwQVy09+JFNENGyEP4Yp1o2jPOP7IrlYx/rGqeQbo06u3ROserjLBgftGvUFr1HZSIUK31xGmIpRok9v6sZZ2fVlrG823SUDKYZzU1uBad7hvNY3VPBtIrx8w/Jm//pQgCUMsZ5gQpA='
SECRET_TOKEN_REFRESH_KEY='ynQUrcnkApAsyGsLiGweKylyS9dNLFgEtsIFAi9eXxMFj48smr3NwGIEEOvfPhY2zuCrXh1Ha4a5dnVO2nSFYdusKf0HaZHFthN2fXK7riuhgXs1mUfpGAYykL25TW7YXtcUg3Y8OzIIqqCHbkSdQkMVWxRpbfFnJDrJ7sx0l/Q='
```

## 🧾 Full Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── default.js
│   └── db/
│       └── mongoose.js
├── middlewares/
│   ├── errorHandler.js
│   ├── validation.js
│   └── guard/
│       ├── auth.guard.js
│       └── captcha.guard.js
├── services/
│   └── redis.service.js
├── modules/
│   ├── auth/
│   │   ├── auth.routes.js
│   │   └── auth.controller.js
│   ├── users/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.model.js
│   │   └── user.validation.js
│   └── captcha/
│       ├── captcha.routes.js
│       └── captcha.controller.js
├── utils/
│   ├── captcha.util.js
│   ├── password.util.js
│   └── token.util.js
```

## ✅ Validation

All request validation is done using **Joi**, with schemas organized by module.
## 🧠 Redis Usage

This project uses **Redis** for two main purposes:
- 🔁 **Storing Refresh Tokens**: Refresh tokens are stored in Redis to enable token revocation and reusability control.
- 🔐 **Captcha Management**: Captchas are generated and stored temporarily in Redis with an expiration time to validate user input during sensitive operations (e.g., profile update).