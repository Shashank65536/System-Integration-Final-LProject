const express = require('express');
const router = express.Router();

const controller = require('../controllers/summarizationController');


router.post('/summarize_text',controller.summarizeText);

router.post('/summarize_conversations',controller.summarizeConversations);

module.exports = router;