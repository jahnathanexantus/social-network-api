const router = require("express").Router();
const {
	getThoughts,
	getSingleThought,
	createThought,
	deleteThought,
	updateThought,
	removeReaction,
	addReaction,
} = require("../../controllers/thoughtController");


router.route("/").get(getThoughts).post(createThought);


router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

router.route("/:thoughtId").put(updateThought)
router.route("/:thoughtId/reaction").post(addReaction)
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction)

module.exports = router;
