const config = {
    cors: {
      origin: 'http://localhost:3000', // Change as needed
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    },
    aws: {
      region: 'us-west-1', // Change to your AWS region
      email: {
        source: 'shabeer.ahamad@gmail.com', // Replace with your verified email
        subject: 'Welcome to TalentHunt!',
      },
    },
  };
  
  module.exports = config;
  
