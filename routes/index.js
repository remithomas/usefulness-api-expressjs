const express = require('express');
const router = express.Router();

router.get('/', (_request, response) => {
	response.end('welcome');
});

module.exports = router;
