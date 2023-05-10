const router = require("express").Router();

const { createComment, getComments } = require("../controllers/Comment");

router.post("/:id/createComment", createComment);
router.get("/:id/getComments", getComments);

module.exports = router;