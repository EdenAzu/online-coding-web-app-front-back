// Contains functions that serve as controller actions for handling HTTP requests related to code blocks.
const CodeBlock = require('./models/codeblock');

exports.getCodeBlocks = async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find({}, 'title');
    res.json(codeBlocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCodeBlockByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const codeBlock = await CodeBlock.findOne({ title });
    if (!codeBlock) {
      return res.status(404).json({ message: 'Code block not found' });
    }
    res.json(codeBlock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

