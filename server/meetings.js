const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

//GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});

//POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => { //listens for POST requests to /api/meetings
    const newMeeting = createMeeting(); // Create a new meeting object with default values
    // Add the new meeting to the database
    const addedMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(addedMeeting); // Respond with the newly created meeting
});

//DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => { //listens for DELETE requests to /api/meetings
    /*const deletedMeetings = */deleteAllFromDatabase('meetings');
    res.status(204).send(); // Respond with 204 No Content status
});

module.exports = meetingsRouter;