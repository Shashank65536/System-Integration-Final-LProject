const express = require('express');
const router = express.Router();

const controller = require('../controllers/summarizationController');


/**
 * @swagger
 * /summarize-text:
 *   post:
 *     summary: Summarize Text
 *     description: Receives a list of text documents and returns their summarized versions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/TextDocument'
 *     responses:
 *       200:
 *         description: Successfully summarized the text documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SummarizedDocument'
 *       400:
 *         description: Invalid request format
 *
 * components:
 *   schemas:
 *     TextDocument:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           description: The original text to be summarized.
 *     SummarizedDocument:
 *       type: object
 *       required:
 *         - summarizedText
 *       properties:
 *         summarizedText:
 *           type: string
 *           description: The summarized version of the original text.
 */
router.post('/summarize_text',controller.summarizeText);


/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Conversation Analysis API
 *   description: API for analyzing and summarizing conversations.
 *   version: "1.0.0"
 * servers:
 *   - url: http://localhost:3000
 *     description: Local Development Server
 * paths:
 *   /analyze-conversation:
 *     post:
 *       summary: Analyze and summarize a conversation
 *       description: Takes a conversation input and returns summarized aspects.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversationRequest'
 *             example:
 *               displayName: "Conversation Task Example"
 *               analysisInput:
 *                 conversations:
 *                   - conversationItems:
 *                       - text: "Hello, you’re chatting with Rene. How may I help you?"
 *                         id: "1"
 *                         role: "Agent"
 *                         participantId: "Agent_1"
 *                       - text: "Hi, I tried to set up wifi connection for Smart Brew 300 espresso machine, but it didn’t work."
 *                         id: "2"
 *                         role: "Customer"
 *                         participantId: "Customer_1"
 *                     modality: "text"
 *                     id: "conversation1"
 *                     language: "en"
 *               tasks:
 *                 - taskName: "Conversation Task 1"
 *                   kind: "ConversationalSummarizationTask"
 *                   parameters:
 *                     summaryAspects:
 *                       - "issue"
 *                 - taskName: "Conversation Task 2"
 *                   kind: "ConversationalSummarizationTask"
 *                   parameters:
 *                     summaryAspects:
 *                       - "resolution"
 *                     sentenceCount: 1
 *       responses:
 *         '200':
 *           description: Successfully analyzed and summarized the conversation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ConversationResponse'
 *               example:
 *                 jobId: "8280d092-8ae1-4d7f-9c7e-1ea5a475a904"
 *                 lastUpdatedDateTime: "2023-12-09T02:43:11Z"
 *                 createdDateTime: "2023-12-09T02:43:09Z"
 *                 expirationDateTime: "2023-12-10T02:43:09Z"
 *                 status: "succeeded"
 *                 errors: []
 *                 displayName: "Conversation Task Example"
 *                 tasks:
 *                   completed: 2
 *                   failed: 0
 *                   inProgress: 0
 *                   total: 2
 *                   items:
 *                     - kind: "conversationalSummarizationResults"
 *                       taskName: "Conversation Task 1"
 *                       lastUpdateDateTime: "2023-12-09T02:43:10.8956399Z"
 *                       status: "succeeded"
 *                       results:
 *                         conversations:
 *                           - summaries:
 *                               - aspect: "issue"
 *                                 text: "Customer is unable to set up wifi connection for Smart Brew 300 espresso machine."
 *                             id: "conversation1"
 *                             warnings: []
 *                     - kind: "conversationalSummarizationResults"
 *                       taskName: "Conversation Task 2"
 *                       lastUpdateDateTime: "2023-12-09T02:43:11.2104008Z"
 *                       status: "succeeded"
 *                       results:
 *                         conversations:
 *                           - summaries:
 *                               - aspect: "resolution"
 *                                 text: "The agent instructed the customer to push the wifi connection button, hold for 3 seconds, and check if the power light blinks on and off every second."
 *                             id: "conversation1"
 *                             warnings: []
 *         '400':
 *           description: Invalid request format
 * components:
 *   schemas:
 *     ConversationRequest:
 *       type: object
 *       required:
 *         - displayName
 *         - analysisInput
 *         - tasks
 *       properties:
 *         displayName:
 *           type: string
 *         analysisInput:
 *           type: object
 *           properties:
 *             conversations:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *     Conversation:
 *       type: object
 *       properties:
 *         conversationItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ConversationItem'
 *         modality:
 *           type: string
 *         id:
 *           type: string
 *         language:
 *           type: string
 *     ConversationItem:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         id:
 *           type: string
 *         role:
 *           type: string
 *         participantId:
 *           type: string
 *     Task:
 *       type: object
 *       properties:
 *         taskName:
 *           type: string
 *         kind:
 *           type: string
 *         parameters:
 *           type: object
 *     ConversationResponse:
 *       type: object
 *       properties:
 *         jobId:
 *           type: string
 *         lastUpdatedDateTime:
 *           type: string
 *           format: date-time
 *         createdDateTime:
 *           type: string
 *           format: date-time
 *         expirationDateTime:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *         displayName:
 *           type: string
 *         tasks:
 *           type: object
 *           properties:
 *             completed:
 *               type: integer
 *             failed:
 *               type: integer
 *             inProgress:
 *               type: integer
 *             total:
 *               type: integer
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResult'
 *     TaskResult:
 *       type: object
 *       properties:
 *         kind:
 *           type: string
 *         taskName:
 *           type: string
 *         lastUpdateDateTime:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         results:
 *           type: object
 *           properties:
 *             conversations:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConversationSummary'
 *     ConversationSummary:
 *       type: object
 *       properties:
 *         summaries:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               aspect:
 *                 type: string
 *               text:
 *                 type: string
 *         id:
 *           type: string
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 */

router.post('/summarize_conversations',controller.summarizeConversations);

module.exports = router;