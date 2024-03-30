/*
 * Imports the Express.js framework.
 * Creates a new instance of an Express router.
 * And handling HTTP requests related to code blocks.
 */

const express = require('express');
const router = express.Router();
const codeblockController = require('./codeblockcontroller')

router.get('/codeblocks', codeblockController.getCodeBlocks);
router.get('/codeblocks/:title', codeblockController.getCodeBlockByTitle);

module.exports = router;