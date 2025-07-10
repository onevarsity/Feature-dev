const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'API is running successfully!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

module.exports = router;