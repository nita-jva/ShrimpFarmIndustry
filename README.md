# Shrimp Farm Industry

## Instructions for running the project

### Prerequisites
- mysql
- npm
- node

### Create Database
MySQL has been used. Make sure mysql is installed and a user has been created.
1. Go to `server/connector.js`
2. Change the `user` and `password` fields to those for your sql user.
3. Start the mysql shell and create the database
    ```
    CREATE DATABASE farm_db;
    ```
4. Run the script `init_db.js` in the `server` directory to create the tables.
    ```
    node init_db.js
    ```

### Start the Server
ExpressJS was used to create a REST API.
1. Go to the `server` directory.
2. Run `npm install` to install all the packages.
3. Start the server with `npm start`

### Start the Frontend
ReactJS was used for the frontend.
1. Go to the `client` directory.
2. Run `npm install` to install all the packages.
3. Start the react app with `npm start`
