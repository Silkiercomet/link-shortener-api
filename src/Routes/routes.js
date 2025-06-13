const shortenLink = require("../Controllers/short");
const redirectToLink = require("../Controllers/getUrl")
const express = require('express');
const router = express.Router();

router.route("/").post(shortenLink);

router.route("/links/:shortUrl").get(redirectToLink);

module.exports = router;