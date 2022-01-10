const express = require("express");
const { db } = require("../database");
const router = express.Router();

router.post("/", async (req, res) => {
    const users = await db.users.find({}).toArray()
    res.json(users);
});

module.exports = router;
