const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const sessionController = require("../controllers/sessionController")

router.post("/api/sessions/create", helper.ensureAuthenticated, sessionController.create);
router.get("/api-sessions", helper.ensureAuthenticated, sessionController.all);
router.get("/api/sessions/:id", helper.ensureAuthenticated, sessionController.detail);
router.post("/api/sessions/register", helper.ensureAuthenticated, sessionController.registration);
router.delete("/api/sessions/:id", helper.ensureAuthenticated, sessionController.delete);

module.exports = router;