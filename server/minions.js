const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

// GET /api/minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
});

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => { //listens for POST requests to /api/minions
    const newMinion = req.body; // Get the new minion data from the request body
    // Validate the new minion data
    if (!newMinion || !newMinion.name/* || !newMinion.title || !newMinion.salary*/) { //could add strict type checks here too like data types (string, number, etc)
      return res.status(400).send({ error: 'Invalid minion data' });
    }  
    // Add the new minion to the database
    const addedMinion = addToDatabase('minions', newMinion);
    res.status(201).send(addedMinion); // Respond with the newly created minion
});

//GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => { //listens for GET requests to /api/minions/:minionId ; :minionId is a route parameter
    const minionId = req.params.minionId; // Extract the minionId from the route parameters
    const minion = getFromDatabaseById('minions', minionId); //takes the model name argument, and a second string argument (representing the unique ID of the element).
        // Returns the element with the matching ID, or undefined if no match is found.
    if (!minion) { // If the minion with the specified ID does not exist (i.e., getFromDatabaseById returns undefined)
      return res.status(404).send({ error: 'Minion not found' });
    }
    res.status(200).send(minion); // 'else', respond with the found minion
});

//PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => { //listens for PUT requests to /api/minions/:minionId
    const minionId = req.params.minionId; // Extract the minionId from the route parameters
    const updatedMinionData = req.body; // Get the updated minion data from the request body
    const minion = getFromDatabaseById('minions', minionId); // Check if the minion exists

    // Validate that minionId is a numeric string
    if (!/^\d+$/.test(minionId)) {
        return res.status(404).send({ error: 'Minion ID must be a numeric string' });
    }

    //Return 404 if minion not found
    if (!minion) { // If the minion with the specified ID does not exist (i.e., getFromDatabaseById returns undefined)
        return res.status(404).send({ error: 'Minion not found' });
    }

    // Validate the updated minion data
    if (!updatedMinionData || !updatedMinionData.name/* || !updatedMinionData.title || !updatedMinionData.salary*/) { //could add strict type checks here too like data types (string, number, etc)
        return res.status(400).send({ error: 'Invalid minion data' });
    }

    // Ensure the ID in the request body matches the ID in the route parameter
    if (updatedMinionData.id && updatedMinionData.id !== minionId) { // If the request body contains an ID and it does not match the minionId from the route
        return res.status(400).send({ error: 'Minion ID mismatch' });
    }

    updatedMinionData.id = minionId; // Ensure the updated data has the correct ID
    const updatedMinion = updateInstanceInDatabase('minions', updatedMinionData); //takes the model name argument, and an object argument (representing the updated element).
        // Returns the updated element, or null if no match is found or if the provided data is invalid.
    if (!updatedMinion) { // If the minion with the specified ID does not exist (i.e., updateInstanceInDatabase returns null)
        return res.status(404).send({ error: 'Minion not found' });
    }
    res.status(200).send(updatedMinion);
});

//DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    
    const minionId = req.params.minionId; // Extract the minionId from the route parameters
    const deleted = deleteFromDatabasebyId('minions', minionId); //takes the model name argument, and a second string argument (representing the unique ID of the element to be deleted).
    // Returns true if the element was found and deleted, or false if no match was found.
    if (!deleted) { // If the minion with the specified ID does not exist (i.e., deleteFromDatabasebyId returns false)
      return res.status(404).send({ error: 'Minion not found' });
    }
    //else, it was deleted. confirm deletion
    res.status(204).send(); // Respond with 204 No Content status code
});


module.exports = minionsRouter;