
# Boss Machine

Boss Machine is a practice project from Codecademy focused on practising Express.js CRUD operations and backend architecture learnt in the course.  
Designed to manage the minions, brilliant million-dollar ideas and meetings (by retrieving, creating, updating and deleting) for the world's most accomplished (and evil) entrepreneurs.  
This project involved building out an Express server that will handle various routes and functionality, allowing you to fully manage these resources.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Minions](#minions)
  - [Ideas](#ideas)
  - [Meetings](#meetings)
- [Future API Endpoints](#future-api-endpoints)
  - [Work (Bonus)](#work-bonus)
- [Custom Middleware](#custom-middleware)
- [Testing](#testing)
- [Technologies](#technologies)

## Project Overview

Boss Machine provides a RESTful API that allows you to manage minions, ideas, and meetings. The project is designed to demonstrate proficiency in Express.js, middleware, and handling RESTful routes. The backend is powered by a simple in-memory database.

## Installation
Make sure Node.js is installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kevBunn/project-4-boss-machine-start.git
   cd project-4-boss-machine-start
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run start
   ```

   The frontend React app should automatically open in your default browser at `http://localhost:3000`  
   The backend server runs at `http://localhost:4001`

4. **Run the tests:**
   ```bash
   npm run test
   ```

   This will run the Codecademy provided test suite, which checks for functionality and edge cases.

## API Endpoints

### Minions

- **GET `/api/minions`**
  - Retrieves an array of all minions.

- **POST `/api/minions`**
  - Creates a new minion and saves it to the database.

- **GET `/api/minions/:minionId`**
  - Retrieves a single minion by ID.

- **PUT `/api/minions/:minionId`**
  - Updates a single minion by ID.

- **DELETE `/api/minions/:minionId`**
  - Deletes a single minion by ID.

### Ideas

- **GET `/api/ideas`**
  - Retrieves an array of all ideas.

- **POST `/api/ideas`**
  - Creates a new idea and saves it to the database.

- **GET `/api/ideas/:ideaId`**
  - Retrieves a single idea by ID.

- **PUT `/api/ideas/:ideaId`**
  - Updates a single idea by ID.

- **DELETE `/api/ideas/:ideaId`**
  - Deletes a single idea by ID.

### Meetings

- **GET `/api/meetings`**
  - Retrieves an array of all meetings.

- **POST `/api/meetings`**
  - Creates a new meeting. No request body is needed, as meetings are generated automatically.

- **DELETE `/api/meetings`**
  - Deletes all meetings from the database.

## Future API Endpoints

### Work
- **GET `/api/minions/:minionId/work`**
  - Retrieves an array of all work for the specified minion.

- **POST `/api/minions/:minionId/work`**
  - Creates a new work object and saves it to the database.

- **PUT `/api/minions/:minionId/work/:workId`**
  - Updates a single work object by ID.

- **DELETE `/api/minions/:minionId/work/:workId`**
  - Deletes a single work object by ID.

## Custom Middleware

### `checkMillionDollarIdea`

This custom middleware ensures that any new or updated ideas are worth at least one million dollars. The total value of an idea is calculated as the product of its `numWeeks` and `weeklyRevenue` properties.

- **File:** `server/checkMillionDollarIdea.js`
- **Usage:** Used on POST `/api/ideas` to validate new idea submissions.

## Testing

The project includes a comprehensive test suite that checks for all essential functionality and edge cases. Tests automatically rerun whenever you save changes to the server files while they are open in a terminal window. To run the tests:

```bash
npm run test
```

## Main Technologies used to complete the Project

- **Express.js**
  - Main technology used for this practice project.
- **Node.js** 
- **JavaScript**
- **Mocha & Chai**
  - Did not create tests in this project, but utilised provided test suite to complete project in a TDD way)
- **React**
  - The React was provided as a part of the starting template by Codecademy. However, I found the template to be dated (5+ years old) and it seemed to have some problems; several errors in the bash terminal when runing 'npm install'. As such, and as this was not the main focus for this project, I used it as an opportunity to put AI Copilot to the test (for maximum productivety; to solve the issues and get back to the main objective of the project) and did some 'vibe coding' to refactor the JavaScript React code; so I could use up to date packages and dependencies.

