const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: 'Validation Error',
      details: errors
    });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate field value entered'
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }
  
  res.status(500).json({
    error: 'Internal server error'
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found'
  });
};

module.exports = {
  errorHandler,
  notFound
};