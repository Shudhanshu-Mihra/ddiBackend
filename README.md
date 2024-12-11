# My Express App

This is a simple Express app with user authentication and file handling features.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add your environment variables

## Running the app

1. Run `npm start` to start the server
2. The server will be running on port 3000 (or the port specified in your `.env` file)

## Endpoints

- POST `/api/login` - Login a user
- POST `/api/token` - Get a JWT token
- GET `/api/user` - Get user info
- POST `/api/upload` - Upload a file
- POST `/api/convert-pdf` - Convert a PDF file
- GET `/api/data` - Get data
- GET `/api/company` - Get company info
- POST `/api/post-ledger` - Post a ledger
- GET ` http://192.168.1.7:5000/${useruuid}?companyname=ss`