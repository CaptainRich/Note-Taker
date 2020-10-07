
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Import the other modules needed.
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../db/db.json');

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Define an instance of 'Router', since we can't use 'app' here ('app' is instantiated in 'server.js')
const router = require('express').Router();


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add the route to the 'notes' data
router.get( '/notes/', (req, res) => {

    let results = notes;
   
    // The query will come from the browser address line, i.e. an API request '?parameter=target'
    if( req.query ) {
        results = filterByQuery( req.query, results );
    }

    res.json(results);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define a new route, with a specific ID.  Note a parameter route must follow the non-parameter route
router.get( '/notes/:id', (req, res) => {
    const result = findById( req.params.id, notes );

    if( result ) {
        res.json(result);
    }
    else {
        res.send( 404 );
    };

});


////////////////////////////////////////////////////////////////////////////////////////////////
// Define the 'post' function to store data on the server
router.post('/notes', (req, res) => {
  // The (request) req.body is where the incoming content will be

  // Set the note's ID based on what the next index of the array will be.
  req.body.id = notes.length.toString();

  // Now that we have a new ID, add the note to the JSON file and the database file.  First
  // validate the data, and if problems, send back a '400 error'.
  if( !validateNote( req.body ) ) {
      res.status(400).send('The note is not properly formatted.');
  } else {
    const animal = createNewNote( req.body, notes );
    //console.log(req.body);
    res.json(req.body);
  };
} );

module.exports = router;
