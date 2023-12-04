# E-Commerce Backend API Server

E-Commerce Backend API Server with NodeJS.

## Description

This project is created with the help of Gen-AI (Codewhispere) and extensive learning of Javascript, NodeJs, MongoDB.

## Getting Started

### Dependencies

* express
* bcrypt
* cors
* dotenv
* jsonwebtoken
* mongoose
* nodemon
* validator

### Installing

* Install NodeJS into Server
* Should Have Node and NPM installed
* Set environment variables for database in .env file

### Executing program

* Check versions of node and npm with commands below
```
node -v
npm -v
```
* Install Modules
```
npm install
or
npm i
```
* Running the App in dev environment

```
npm run dev
```
* Running the App in production environment

```
npm run start
```
* API Endpoints

```
post: /api/v1/auth/login                {"email": String, "password": String}
post: /api/v1/auth/changepassword       {"oldPassword": String, "newPassword": String}  {Bearer Toekn Required}
post: /api/v1/users/register            {"firstName": String, "lastName": String, "email": String, "password": String}
get:  /api/v1/users/all
get:  /api/v1/users/profile             {Bearer Toekn Required}
get:  /api/v1/products/all
get:  /api/v1/products/id/:id
get:  /api/v1/products/add
get:  /api/v1/cart/                     {Bearer Toekn Required}
post: /api/v1/cart/add                  {"productId": Number, "quantity": Number}   {Bearer Toekn Required}
post: /api/v1/cart/update               {"_id": Number(Cart ID), "productId": Number, "quantity": Number}   {Bearer Toekn Required}
post: /api/v1/checkout/                 {"paymentMode": String, "firstName": String, "lastName": String, "streetAddress": String, "city": String, "state": String, "pincode": Number, "mobile": Number} {Bearer Toekn Required}

```


## Help

Contact Me.

## Authors

Developer:

Suram Singh  

[Website](https://suramsingh.com/)

## Version History

* 1.0.0
    * Initial Release

## License

This project is free to use.
