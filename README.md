# Module-6
Bank Account Data Validation System
This is an example Node.js application that demonstrates how to implement an advanced data validation system for a bank account data model using Mongoose and Express. The application allows users to create, read, update, and delete bank account data with a variety of fields, including nested sub-documents, and validates the data based on the rules defined in the Mongoose model.

Prerequisites
To run this application, you will need:

Node.js version 14 or later
NPM (Node Package Manager) version 6 or later
MongoDB database server version 4 or later
Installation
To install this application, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/rgiragos/Module-6.git
Change to the project directory:

bash
Copy code
cd bank-account-validation
Install the dependencies:

Copy code
npm install
Configure the environment variables:

bash
Copy code
cp .env.example .env
Edit the .env file with your MongoDB connection string and other settings if necessary.

Usage
To run this application, follow these steps:

Start the MongoDB database server:

Copy code
mongod
Start the Express server:

sql
Copy code
npm start
The server will listen on port 3000 by default. You can change the port by setting the PORT environment variable.

Use a tool like Postman or a web browser to send HTTP requests to the server, using the API endpoints described in the documentation.

For example, you can create a new bank account by sending a POST request to http://localhost:3000/bankaccounts with a JSON object representing the account data in the request body.

The server will validate the data based on the Mongoose model rules and return an appropriate response with status code and message.
