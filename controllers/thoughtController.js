const { Thought, User } = require('../models');


module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)    
      )
      .catch((err) => res.status(500).json(err));  
  },

  // Post new thought (push thoughts id to user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id }},
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.staus(404).json({ message: 'Thought created, but no user found with that ID'})
          : res.json('Thought created successfully!')
      )
      .catch((err) => res.status(500).json(err));
  },

  // Put for update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete to remove thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID'})
          : res.statue(200).json({ message: 'Thought deleted successfully.'})
      )
      .catch((err) => res.status(500).json(err));
  },

  // Post to create reaction stored in thought's reaction array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete to pull and remove reaction by reaction's id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: { reactionId: req.params.reactionId}} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
}
