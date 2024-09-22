const express = require('express');
const { createPage, getPage, deletePage, updatePage } = require('../controllers/pageController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');
const router = express.Router();

router.post('/:diary_id/pages', authenticateToken,createPage);

router.get('/:diary_id/pages', authenticateToken,getPage);

router.delete('/:diary_id/pages/:page_id', authenticateToken,deletePage);

router.put('/:diary_id/pages/:page_id', authenticateToken,updatePage);


module.exports = router;