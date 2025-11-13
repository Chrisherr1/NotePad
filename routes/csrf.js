const express = require('express');
const router = express.Router();
const { generateToken } = require('../middleware/csrf');

router.get('/csrf', (req, res) => {
  const token = generateToken(req);
  res.json({ csrfToken: token });
});

module.exports = router;