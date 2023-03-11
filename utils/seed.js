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
      username: 'TestUser1',
      email: 'TestUser1@email.com',
    },
    {
      username: 'TestUser2',
      email: 'TestUser2@email.com',
    },
    {
      username: 'TestUser3',
      email: 'TestUser3@email.com',
    },
    {
      username: 'TestUser4',
      email: 'TestUser4@email.com',
    },
    {
      username: 'TestUser5',
      email: 'TestUser5@email.com',
    }
  ];
  const thoughts = [
    {
      thoughtText: 'Test thought 1',
      username: 'TestUser3',
      reactions: [ 
        {
          reactionBody: 'Test reaction 1',
          username: 'TestUser1'
        },
        { 
          reactionBody: 'Test reaction 2',
          username: 'TestUser2'
        } 
      ]
    },
    {
      thoughtText: 'Test thought 2',
      username: 'TestUser1',
      reactions: [  
        {
        reactionBody: 'Test reaction 3',
        username: 'TestUser3'
        }
      ]
    },
    {
      thoughtText: 'Test thought 3',
      username: 'TestUser4',
      reactions: []
    },
    {
      thoughtText: 'Test thought 4',
      username: 'TestUser1',
      reactions: [        
        {
        reactionBody: 'Test reaction 4',
        username: 'TestUser5'
        }
      ]
    },
    {
      thoughtText: 'Test thought 5',
      username: 'TestUser3',
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
