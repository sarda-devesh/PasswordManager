# PasswordManager

A web program to locally save and retrieve stored passwords. The data is stored in a mySQL database that is running locally to keep track of the login information.
The backend scripts are written in Node JS and are used to interface with the database. They process and respond to incoming request from the main application using the express framework.
The frontend is an React Application that takes in user input and runs the necessary commands, and it interfaces with the backend software using REST API principles. 