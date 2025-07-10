const validatePost = (req, res, next) => {
  const { content, author } = req.body;
  
  if (!content || !author) {
    return res.status(400).json({ 
      error: 'Content and author are required' 
    });
  }
  
  if (content.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Content cannot be empty' 
    });
  }
  
  if (author.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Author cannot be empty' 
    });
  }
  
  next();
};

const validateReaction = (req, res, next) => {
  const { type, user } = req.body;
  
  if (!type || !user) {
    return res.status(400).json({ 
      error: 'Reaction type and user are required' 
    });
  }
  
  const validTypes = ['like', 'love', 'laugh', 'angry', 'sad'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ 
      error: 'Invalid reaction type. Valid types: ' + validTypes.join(', ') 
    });
  }
  
  if (user.trim().length === 0) {
    return res.status(400).json({ 
      error: 'User cannot be empty' 
    });
  }
  
  next();
};

const validateComment = (req, res, next) => {
  const { content, author } = req.body;
  
  if (!content || !author) {
    return res.status(400).json({ 
      error: 'Content and author are required' 
    });
  }
  
  if (content.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Comment content cannot be empty' 
    });
  }
  
  if (author.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Author cannot be empty' 
    });
  }
  
  next();
};

const validateCommentEdit = (req, res, next) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ 
      error: 'Content is required' 
    });
  }
  
  if (content.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Comment content cannot be empty' 
    });
  }
  
  next();
};

module.exports = {
  validatePost,
  validateReaction,
  validateComment,
  validateCommentEdit
};