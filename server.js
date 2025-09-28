const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

/* Do not change the following line! It is required for testing and allowing
 * the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// Serve static files from the root of the project
app.use(express.static(path.join(__dirname, 'public')));

// Main page, Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add middleware for handling CORS requests from index.html
// Enable CORS
app.use(cors());

// Add middware for parsing request bodies here:
// Parse incoming request bodies
//avoids using body-parser; since what that does is actually built-in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter); // Mount API router

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

module.exports = app;