# Abidas - MERN Stack Adidas Clone

### Link To Site: [https://abidasmern.herokuapp.com/](https://abidasmern.herokuapp.com/)

![image](https://vishnurupan.com/static/media/abidas1.24551965.jpg)

---


## Table of Contents
1. [Overview](#Overview)
2. [Features](#Features)
3. [Technologies Used](#Technologies-Used)
4. [Backend](#Backend)
5. [Frontend](#Frontend)


## Overview
The goal for this project was to develop a full stack application using React and Redux. One of the most common full stack applications on the internet are e-commerce websites. I decided to re-create the adidas website and implement the features most useful in e-commerce stores. This was a project to help solidify my knowledge using Redux in React and backend authentication. 

## Features
- Login and Signup system with user authentication and authorization
- Shopping Cart functionality
- Checkout process
- PayPal/Credit Card payment options
- Separate user and admin profile screen
- User orders list
- Product upload, delete, and modify
- Search bar
- Product search filters
- Product review and rating system


## Technologies Used
- **React:** Building UI components with React Hooks.
- **Redux:** Statement management used to hold information for UI components.
- **Node.js & Express.js:** Creating backend routes for fetching products.
- **MongoDB:** Primary database and Mongoose ODM
- **JWT (JSON Web Tokens):** Backend user authentication.
- **React-Bootstrap:** Custom components.
- **styled-components:** Creating custom CSS properties.

## Backend 
The backend is divided into specific protected and non-protected routes. These routes take controller functions from used to either create, delete, update, or fetch data. Separated in 3 folders for users, products, and orders. For example, product reviews would be handled by updating the existing product field values, which holds a ratings and review field. I verify that the data being recieved is not a duplicate before saving it to the database. If an error occurs when saving the product, a custom error message is thrown depending on the route hit. Routes that require authentication is handled by a protect function to validate the JWT. 

## Frontend 
The frontend design was inspired by the adidas site. Using React-Bootstrap, I was able use its grid system to replicate a similar design layout. The frontend contains the redux store with folders separating the actions and reducers. An action is either dispatched onClick or through useEffect. The process eventually updates the state tree if it was a success, which updates all UI components that depend on a specific state. A failed request/action is handled by React’s conditional rendering, where an Error component will render with a brief description of the error. Working with redux gave me experience working with the action, reducer, dispatch setup to update state throughout your application. Rather than lifting state, you can pull everything with useSelector from the state tree. 
