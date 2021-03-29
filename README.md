# Workout Logger App

A single page application where you can log your workouts. Simply log a set with your account and you will be able to see your history of workouts and exercises.

## Motivation

This project was created for solidfying my understanding of the MERNG stack. I decided to create a workout logger because the Health and Fitness industry is important to me and I wanted to create something where I could log my own workouts and have access to this data.

## Technologies/Frameworks Used

- MongoDB (Atlas)
- Express
- React
- Node
- GraphQL

## Features

- Login and Registration Functionality.
- Logging a set of an exercise that was performed.
- App will automatically create a new workout if the set logged is 3+ hours from the last workout.
- App will add any sets logged within the 3 hours a workout is created to that workout.
- Users can view their workout history.
- Users can view their exercise history.
- Users can edit a set from either workout or exercise history and will be updated for both.
- Users can delete a set from either workout or exercise history and will be updated for both.

## Demo

A live version of this project can be found [here](https://workout-logger-app.netlify.app/). **NOTE:** This is a personal project and although security implications have been considered and enforced (bcrypt/jwt), personal sensitive data should **NEVER** be entered or exposed while using this application. It is recommended that temporary data (data to be discarded after use) should be entered instead to prevent any potential threat of intruders.
