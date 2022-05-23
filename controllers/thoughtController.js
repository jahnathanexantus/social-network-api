const { User, Thought } = require("../models");
const Reaction = require("../models/Reaction")
module.exports = {
	
	getThoughts(req, res) {
		Thought.find()
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => res.status(500).json(err));
	},
	
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.Id })
			.select("-__v")
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No thought with that ID" })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err));
	},
	
	createThought(req, res) {
		Thought.create(req.body)
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.Id })
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: "No user with that ID" })
					: Thought.deleteMany({ _id: { $in: User.thoughts } })
			)
			.then(() => res.json({ message: "user and thoughts deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	
	updateThought(req, res) {
		Thought.findOneAndUpdate(
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
		Thought.findOneAndUpdate(
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
		Reaction.findOneAndRemove(req.params.ReactionId).then((reaction)=>
		Thought.findOneAndUpdate(
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
