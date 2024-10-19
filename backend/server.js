const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const uuid = require('uuid').v4; // For generating unique file names

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({ region: 'us-west-1' }); // Update to your region
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Signup route
app.post('/api/signup-job-seeker', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const signupDate = new Date().toISOString();
  const hashedPassword = password; // Hash password if needed

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Resume file is required' });
  }

  // Upload file to S3
  const fileName = `${uuid()}_${req.file.originalname}`;
  const s3Params = {
    Bucket: 'jobseeekerresumes', // Change to your S3 bucket name
    Key: fileName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const s3Data = await s3.upload(s3Params).promise();
    
    // Save user data to DynamoDB
    const params = {
      TableName: 'Users', // Change to your DynamoDB table name
      Item: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        signupDate,
        resumeUrl: s3Data.Location, // Store the S3 file URL
      },
    };

    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

// Add this to your existing server code above the server start
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    TableName: 'Users',
    Key: {
      email,
    },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    const user = result.Item;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = true; // Compare hashed passwords if implemented

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful!',
      firstName: user.firstName,
      lastName: user.lastName,
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
