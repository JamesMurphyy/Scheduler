# Interview Scheduler

Interview Scheduler is a *Full Stack Single Page Web Application* built in **ReactJS**. This application uses specific techniques that optimizes the overall user experience.

It utilizes multiple design and test features such as:
- **Storybook**
- **Cypress**
- **Jest**

This app allows the user to update, edit and delete **PostgreSQL** databases in real-time, all through **Axios** and other features that work together to create a seamless experience. This project follows best practices of ``TDD (Test Driven Development)`` and was tested with more than one feature, eliminating risks for potential unexpeceted errors.

## Project Features
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- A user can see the number of available appointments for each day.

## Final Product

!["Regular View"](https://github.com/JamesMurphyy/Scheduler/blob/master/docs/Screenshot0.PNG)

!["Appointment Form"](https://github.com/JamesMurphyy/Scheduler/blob/master/docs/Screenshot1.PNG)

!["Delete Appointment"](https://github.com/JamesMurphyy/Scheduler/blob/master/docs/Screenshot2.PNG)

!["Edit Appointment/Displays Error if Student Field Blank"](https://github.com/JamesMurphyy/Scheduler/blob/master/docs/Screenshot3.PNG)

## Setup

Install dependencies with `npm install`.

**Must run *scheduler_api* concurrently -- client and API server applications.**
* Steps to run this API server is detailed within the scheduler_api README file. 

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Project Stack

***Front-End:*** React, Axios, JSX, HTML, SASS, JavaScript

***Back-End:*** Express, Node.js, PostgreSQL

***Testing:*** Storybook, Jest, Cypress

## Dependencies Used
- Axios
- Classnames
- Cypress
- React
- Babel-loader
- Node - SASS
- Normalize.css