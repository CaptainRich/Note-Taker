
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Import the other modules needed.
const { findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { v4: uuidv4 } = require('uuid');
const notes = require('../../db/db.json');

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Define an instance of 'Router', since we can't use 'app' here ('app' is instantiated in 'server.js')
const router = require('express').Router();


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add the route to the 'notes' data
router.get( '/notes', (req, res) => {

    let results = notes;
   
    // The query will come from the browser address line, i.e. an API request '?parameter=target'
    // if( req.query ) {
    //     results = filterByQuery( req.query, results );
    // }
    console.log( "Notes from 'get':", results );
    res.json(results);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define a new route, with a specific ID.  Note a parameter route must follow the non-parameter route
router.get( '/notes/:id', (req, res) => {
    const result = findById( req.params.id, notes );

    console.log( "In findbyId, result is: ", result );

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
  console.log( 'In post route.');
  console.log( 'notes array is: ', notes );
  console.log( 'req.body: ', req.body );

  // Set the note's ID based on what the next index of the array will be.
  let newNote = req.body;
  newNote.id  = notes.length;      // this will assign the ID to the physical note number
  //newNote.id = uuidv4();
  console.log(newNote);

  // // Now that we have a new ID, add the note to the JSON file and the database file.  First
  // // validate the data, and if problems, send back a '400 error'.

  if( !validateNote( newNote ) ) {
      res.status(400).send('The note is not properly formatted.');
  } else {
    createNewNote( newNote, notes );

    console.log( "After createNewNote, notes array is: ", notes );
    
    res.json(newNote);
  } 
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Define the 'delete' function to remove data on the server
router.delete('/notes/:id', (req, res) => {

    // The (request) req.body is where the incoming content will be
    console.log( 'In delete route.');
    console.log( 'notes array is: ', notes );
    console.log( 'req.body: ', req.body );
  
    // Set the note's ID based on what the next index of the array will be.
    let noteID = req.params.id;
    
    console.log("ID to be deleted: ", noteID);
  
    // // Now that we have a new ID, add the note to the JSON file and the database file.  First
    // // validate the data, and if problems, send back a '400 error'.
  
    deleteNote( noteID, notes );
  
      console.log( "After deleteOneNote, notes array is: ", notes );
      
      res.json(notes);
  });

module.exports = router;
