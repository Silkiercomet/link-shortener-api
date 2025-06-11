const router = express.Router();
const shortenLink = require("../Controllers/short");
const redirectToLink = require("../Controllers/getUrl")


router.route("/").post(shortenLink);

router.route("/:shortLink").get(redirectToLink);
