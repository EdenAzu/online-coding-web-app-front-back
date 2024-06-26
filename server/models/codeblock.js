//Defining a Mongoose schema and model for a CodeBlock document in my MongoDB database.
const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  solution: {type: String, required: true}
});

const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

module.exports = CodeBlock;