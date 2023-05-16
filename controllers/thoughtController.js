const { Thought, User, Reaction} = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Create a thought
      createThought(req, res) {
        Thought.create(req.body)
          .then((thoughtCreated) => {
            User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thoughtCreated._id}} ,
                { runValidators: true, new: true}
            ).then((user) =>
            !user
            ? res.status(404).json({ message: "User doesn't exist!"})
            : res.status(200).json(user)
          );
            })
          
      },
      // Delete a thought
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : User.deleteMany({ _id: { $in: thoughtCreated } })
          )
          .then(() => res.json({ message: 'thought deleted' }))
          .catch((err) => res.status(500).json(err));
      },
      // Update a thought
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    };
    
