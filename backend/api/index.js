const express = require('express');
const registerRouter = require('./register.js')
const router = express.Router();

router.use("/register", registerRouter)

module.exports = router