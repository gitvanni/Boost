const express = require('express');
const { createPage, getPages, getPage, deletePage, updatePage } = require('../controllers/pageController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');
const router = express.Router();

// Create a new page
router.post('/:diary_id/pages', authenticateToken,createPage);

// Get all pages for the given diary
router.get('/:diary_id/pages', authenticateToken,getPages);

//get the page with the associated id for the given diary
//router.get('/:diary_id/pages/:page_id', getPage)

//Deletes the page with the given id
router.delete('/:diary_id/pages/:page_id', authenticateToken,deletePage);

router.put('/:diary_id/pages/:page_id', authenticateToken,updatePage);


module.exports = router;