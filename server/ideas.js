const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET /api/ideas
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.status(200).send(ideas);
});

//POST /api/ideas to create a new idea and save it to the database.
/*checkMillionDollarIdea middleware
6) is used in a POST /api/ideas route to reject insufficiently profitable ideas*/
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => { //listens for POST requests to /api/ideas, with middleware validation - no.6 of test
    const newIdea = req.body; // Get the new idea data from the request body
    // Validate the new idea data
    if (!newIdea || !newIdea.name) { //could add strict type checks here too like data types (string, number, etc)
      return res.status(400).send({ error: 'Invalid idea data' });
    }  
    // 'else'... Add the new idea to the database
    const addedIdea = addToDatabase('ideas', newIdea);
    res.status(201).send(addedIdea); // Respond with the newly created idea
});

//GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => { //listens for GET requests to /api/ideas/:ideaId ; :ideaId is a route parameter
    const ideaId = req.params.ideaId; // Extract the ideaId from the route parameters
    const idea = getFromDatabaseById('ideas', ideaId); //takes the model name argument, and a second string argument (representing the unique ID of the element).
        // Returns the element with the matching ID, or undefined if no match is found.
    if (!idea) { // If the idea with the specified ID does not exist (i.e., getFromDatabaseById returns undefined) 
        return res.status(404).send({ error: 'Idea not found' });
    }
    res.status(200).send(idea); // 'else', respond with the found idea
});

/*
PUT /api/ideas/:ideaId
      √ updates the correct idea and returns it
      √ updates the correct idea and persists to the database
      1) called with a non-numeric ID returns a 404 error
      2) called with an invalid ID returns a 404 error
      √ called with an invalid ID does not change the database array
*/

//PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => { //listens for PUT requests to /api/ideas/:ideaId
    const ideaId = req.params.ideaId; // Extract the ideaId from the route parameters
    const updatedIdeaData = req.body; // Get the updated idea data from the request body
    const idea = getFromDatabaseById('ideas', ideaId); // Check if the minion exists

    // Validate that ideaId is a numeric string
    if (!/^\d+$/.test(ideaId)) {
        return res.status(404).send({ error: 'Idea ID must be a numeric string' });
    }

    //Return 404 if idea not found
    if (!idea) { // If the idea with the specified ID does not exist (i.e., getFromDatabaseById returns undefined)
        return res.status(404).send({ error: 'Idea not found' });
    }

    // Validate the updated idea data
    if (!updatedIdeaData || !updatedIdeaData.name/* || !updatedIdeaData.description*/ || !updatedIdeaData.numWeeks || !updatedIdeaData.weeklyRevenue) { //could add strict type checks here too like data types (string, number, etc)
        return res.status(400).send({ error: 'Invalid idea data' });
    }  
    // Ensure the ID in the request body matches the ID in the route parameter
    if (updatedIdeaData.id && updatedIdeaData.id !== ideaId) { // If the request body contains an ID and it does not match the ideaId from the route
        return res.status(400).send({ error: 'Idea ID mismatch' });
    }
    const updatedIdeaDataWithId = { ...updatedIdeaData, id: ideaId }; // Ensure the updated data has the correct ID
    const updatedIdea = updateInstanceInDatabase('ideas', updatedIdeaDataWithId); //takes the model name argument, and an object argument (representing the updated element).
        // Returns the updated element, or null if no match is found or if the provided data is invalid.
    if (!updatedIdea) { // If the idea with the specified ID does not exist (i.e., updateInstanceInDatabase returns null)
        return res.status(404).send({ error: 'Idea not found' });
    }
    res.status(200).send(updatedIdea);
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId; // Extract the ideaId from the route parameters
    const deleted = deleteFromDatabasebyId('ideas', ideaId); //takes the model name argument, and a second string argument (representing the unique ID of the element to be deleted).
        // Returns true if the element was found and deleted, or false if no match was found.
    if (!deleted) { // If the idea with the specified ID does not exist (i.e., deleteFromDatabasebyId returns false)
      return res.status(404).send({ error: 'Idea not found' });
    }
    //else, it was deleted. confirm deletion
    res.status(204).send(); // Respond with 204 No Content status code
});

module.exports = ideasRouter;