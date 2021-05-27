# boston-transportation-schedule
This is a take-home project for Sunrun.

## Running the application
### First time setup
The first time you run the application, you will need to install the dependencies using the `npm install` command.
### Running
The application can easily be run by using the `npm run` command in the terminal. The applicaiton will be running on port 3000.

## Description of functionality
This application hits the schedule endpoint of the [MBTA API](https://www.mbta.com/developers/v3-api). It only gets the commuter rails stopping at the North Station in the next 3 hours. The application then formats the arrival times and destinations of these rails into a table.
