const express = require('express');
const router = express.Router();

const controller = require('../controllers/summarizationController');


router.post('/summarize_text',controller.summarize);

module.exports = router;