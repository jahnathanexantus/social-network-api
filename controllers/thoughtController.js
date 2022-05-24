const { User, Thoughts } = require("../models");
const Reaction = require("../models/Reaction")
module.exports = {
	
	getThoughts(req, res) {
		Thoughts.find()
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => res.status(500).json(err));
	},
	
	getSingleThought(req, res) {
		Thoughts.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No thought with that ID" })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err));
	},
	
	createThought(req, res) {
		Thoughts.create(req.body)
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	
	deleteThought(req, res) {
		Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No user with that ID" })
					: Thoughts.deleteMany({ _id: { $in: User.thoughts } })
			)
			.then(() => res.json({ message: "user and thoughts deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	
	updateThought(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.Id },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No thoughts with this id!" })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err));
	},
	addReaction(req, res) {
		Reaction.create(req.body).then((reaction)=> 
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: {reaction: reaction._id }},
			{ runValidators: true, new: true }
		)
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No thought with this id!" })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err)));
	},
	removeReaction(req, res) {
		Reaction.findOneAndRemove(req.params.reactionId).then((reaction)=>
		Thoughts.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: {reaction:{$in: req.params.reactionId}} },
			{ runValidators: true, new: true }
		)
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with this id!" })
					: res.json(userData)
			)
			.catch((err) => res.status(500).json(err)));
	},
};
