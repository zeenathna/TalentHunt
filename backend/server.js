const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

app.use(bodyParser.json());

// Configure DynamoDB
AWS.config.update({ region: 'us-west-1' }); // Update to your region
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Signup route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const signupDate = new Date().toISOString(); // Get current date in ISO format
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const params = {
    TableName: 'Users', // Change to your DynamoDB table name
    Item: {
      firstName,
      lastName,
      phoneNumber, // Store the phone number
      email,
      password: hashedPassword, // Store the hashed password
      signupDate, // Add signup date
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
});


// Add this to your existing server code above the server start
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    TableName: 'Users', // Your DynamoDB table name
    Key: {
      email, // This is the partition key
    },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    const user = result.Item;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user's first and last name along with a success message
    res.status(200).json({ 
      message: 'Login successful!',
      firstName: user.firstName,
      lastName: user.lastName 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Could not log in' });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
