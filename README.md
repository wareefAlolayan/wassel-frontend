# Project Description
This is the frontend for Wassel (means "connector" in english) , a platform that connects manager to his/her employees .it makes the decision making process easier and simplifies orgnizing employees , teams , shifts ,and requests. also it allows the employee to view upcoming shifts as well as tracking vacation requests status , update or cancel them , and make new ones. 

## Repository Description

This repository contains the frontend code for Wassel . It interacts with the backend to get and display data, such as employee details, team data, shifts, and vacation requests.

## Components Table
| **Component** | **Description** |
| -------------------------------------- | --------------------------------------------------------------------- |
| **auth.js** | Manages authentication tokens (login/logout, token storage). |
| **App.jsx** | Sets up routes for the app and manages user data after login. |
| **Home.jsx** `path='/'` | Main homepage with login form, accessible by all users. |
| **Auth/Login.jsx** | Handles login form and authenticates users. |
| **Auth/LogOutButton.jsx** | Logs out the user by clearing tokens and redirecting to the login page. |
| **Auth/ProtectedRoute.jsx** | Protects routes by checking for a valid user token. |
| **Employee/Requests/RequestForm.jsx** | Displays the form for vacation requests (create/edit).|
| **Employee/Requests/Requests.jsx** | Manages and displays vacation requests for employees. |
| **Employee/Shifts/Shifts.jsx** | Displays upcoming shifts for the employee. |
| **Employee/EmployeeHome.jsx** `path='/employee/:employeeId'` | Employee's dashboard with tabs to view shifts and requests. |
| **Manager/Employees/EmployeeCard.jsx** | Displays individual employee's info in a card format. |
| **Manager/Employees/EmployeeList.jsx** | Lists all employees excluding managers. |
| **Manager/Requests/Requests.jsx** | Displays and handles pending vacation requests for the manager. |
| **Manager/Shifts/Shifts.jsx** | Displays the shift board with employee shifts for the week. |
| **Manager/Teams/TeamsForm.jsx** | Handles creating or editing teams. |
| **Manager/Teams/TeamsList.jsx** | Lists teams and allows creation or editing of teams. |
| **Manager/ManagerHome.jsx** `path='/manager/:managerId'` | Manager's home page with navigation to various sections. |

## Tech Stack
- React
- Axios
- React Router
- JWT Authentication
- React Icons
- CSS

## Backend Repo Link

https://github.com/wareefAlolayan/wassel-backend

## IceBox Features
- add shift change requests
- add password reset option
- search and filter employees and shifts 
