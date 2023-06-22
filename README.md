# Citizen-Vaccination-Data

## Authors
Nadav Atis Email: nadavat@edu.hac.ac.il 

Efrat Ilouz Email: efratil@edu.hac.ac.il

## Description
This app is designed to manage a registration system for citizens, capturing their general information and their health conditions related to COVID-19. This application leverages a host of technologies including React, Node.js, Spring Boot, Java, Hibernate, and MySQL on the front and backend.

The frontend and backend are interconnected using RESTful APIs.

## Table of Contents
Installation
Usage
Credits
License
Features

## Installation
### Frontend:
Open the frontend folder using terminal and run the following commands. Please ensure that you have Node.js LTS version 16.15.1 or above installed.

npm install

npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### Backend:
Open the src/main/resources/application.properties file and replace the fields spring.datasource.username and spring.datasource.password with your MySQL server configurations. You also need to have a database already created with the name mentioned in spring.datasource.url in MySQL.

Once the configurations are done, you can start the server using your preferred Java IDE by running the main application class.

## Usage
To start the frontend, use the command npm start.
For starting the backend, use your preferred Java IDE and start the main application class.

## Credits
React
React Router
Java
Spring Boot
Hibernate
MySQL
Node.js
REST API Tutorial
## License
This project is licensed under the terms of the GPL-3.0 license.

## Features
Comprehensive registration form for capturing citizens' data.
List of countries with validation from both front and backend, allows selection from a global list.
Filter or sort any column in the data page (summary).



![page1](https://github.com/efratil/Citizen-Vaccination-Data/assets/91066257/5a019cb8-68b6-43d6-8821-959ce1e23226)
![page12](https://github.com/efratil/Citizen-Vaccination-Data/assets/91066257/af86150a-86f3-4053-9e1b-ac5c3b4c1e1e)
![page2](https://github.com/efratil/Citizen-Vaccination-Data/assets/91066257/fcb1da3e-caf9-4375-b17e-0f0bdcc600a0)



