

const { User, Thought } = require("../models");

module.exports = {
	
	getUser(req, res) {
		User.find()
		.select('-_v')
			.then((userData) => res.json(userData))
			.catch((err) => res.status(500).json(err));
	},
	
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.Id })
			.select("-__v")
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with that ID" })
					: res.json(userData)
			)
			.catch((err) => res.status(500).json(err));
	},
	
	createUser(req, res) {
		User.create(req.body)
			.then((userData) => res.json(userData))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.Id })
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with that ID" })
					: userData.deleteMany({ _id: { $in: userData.thoughts } })
			)
			.then(() => res.json({ message: "user and thoughts deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with this id!" })
					: res.json(userData)
			)
			.catch((err) => res.status(500).json(err));
	},
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: {friends:req.params.friendId} },
			{ runValidators: true, new: true }
		)
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with this id!" })
					: res.json(userData)
			)
			.catch((err) => res.status(500).json(err));
	},
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: {friends:{$in: req.params.friendId}} },
			{ runValidators: true, new: true }
		)
			.then((userData) =>
				!userData
					? res.status(404).json({ message: "No user with this id!" })
					: res.json(userData)
			)
			.catch((err) => res.status(500).json(err));
	},
};

 