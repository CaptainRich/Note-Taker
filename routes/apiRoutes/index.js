
// Middle-ware to make the application aware of all of our routes.


const router     = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');


router.use(noteRoutes);

///////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;