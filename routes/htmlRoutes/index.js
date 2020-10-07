


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Define an instance of 'Router', since we can't use 'app' here ('app' is instantiated in 'server.js')
const router = require('express').Router();

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Also need the 'path' module
const path = require('path');




///////////////////////////////////////////////////////////////////////////////////////////////////
// Setup the route to the main (starting) HTML page.  All this does is read and send the HTML file 
// from the server to the client's browser.
router.get( '/', (req, res) => {
    res.sendFile( path.join(__dirname, '../../public/index.html') );
});


///////////////////////////////////////////////////////////////////////////////////////////////////
// Setup the route to the notes page.
router.get( '/notes', (req, res) => {
    res.sendFile( path.join( __dirname, '../../public/notes.html' ) );
});



module.exports = router;