


// Import the node.js packages we need
const fs   = require( 'fs' );          // file system
const path = require( 'path' );        // package dealing with path/directory names




////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to find by Id.
function findById( id, notesArray ) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to create a new Note. This function will be executed by the route's
// POST call-back function.
function createNewNote( newNote, notesArray ) {

    notesArray.push( newNote );

    // Now write the updated array to the JSON file
    fs.writeFileSync( 
        path.join( __dirname, '../db/db.json' ),
        JSON.stringify( { notes: notesArray }, null, 2 )
    );

    // Return finished data to the POST routine for response
    //return notesArray;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Validation of new data, when adding a new note
function validateNote( newNote ) {

    if( !newNote.title  ||  typeof  newNote.title !== 'string' ) {
        return false;
    };
    
    if( !newNote.text  ||  typeof  newNote.text !== 'string' ) {
        return false;
    };
    
    if( !newNote.id  ||  typeof  newNote.id !== 'number' ) {
        return false;
    };

    return true;
};


//////////////////////////////////////////////////////////////////////////////////////////////////
// Need to export these functions

module.exports = {

    findById,
    createNewNote,
    validateNote
};