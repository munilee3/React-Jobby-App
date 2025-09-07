const userController = require("../controllers/userController.js");
const exporess = require("express");
const router = exporess.Router();

router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);

module.exports = router;
