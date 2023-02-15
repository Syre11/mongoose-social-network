const connection = require('../config/connection');
const moment = require('moment');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [
    {
      username: 'Mordecool',
      email: 'mordecool@email.com',
    },
    {
      username: 'Rigbone',
      email: 'trashboat@email.com',
    },
    {
      username: 'Loli_Pops',
      email: 'pops@email.com',
    },
    {
      username: 'Skips',
      email: 'usedtobewalks@email.com',
    },
    {
      username: 'MuscleMan',
      email: 'mitch@email.com',
    }
  ];
  const thoughts = [
    {
      thoughtText: 'First test thought, this is a test of the first thought',
      username: 'Rigbone',
      reactions: [ 
        {
          reactionBody: 'This test might have worked, I am testing reactions here',
          username: 'MuscleMan'
        },
        { 
          reactionBody: 'did the test work?',
          username: 'Loli_Pops'
        } 
      ]
    },
    {
      thoughtText: 'I wonder if I should change my name to trash boat',
      username: 'Rigbone',
      reactions: [  
        {
        reactionBody: 'You definitely should not, that is embarassing',
        username: 'Skips'
        }
      ]
    },
    {
      thoughtText: 'Margaret is the best, its too bad I always screw things up',
      username: 'Mordecool',
      reactions: []
    },
    {
      thoughtText: 'I think lolipops are acceptable forms of currency',
      username: 'Loli_Pops',
      reactions: [        
        {
        reactionBody: 'Pops... you are ridiculous',
        username: 'Mordecool'
        }
      ]
    },
    {
      thoughtText: 'WHOOOOOO, you know who else is a first thought test? MY MOM!!!',
      username: 'MuscleMan',
      reactions: []
    },
  ];

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
