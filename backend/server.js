const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const uuid = require('uuid').v4; // For generating unique file names
const emailTemplate = require('./config/emailTemplate'); // Import email template
const config = require('./config/config'); // Import configuration

const app = express();

// Use CORS middleware
app.use(cors(config.cors));

app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({ region: config.aws.region });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const ses = new AWS.SES();

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
      TableName: 'JobSeekersTable', // Change to your DynamoDB table name
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

    // Send a welcome email
    const emailParams = {
      Destination: {
        ToAddresses: [email], // recipient email
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailTemplate(firstName),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: config.aws.email.subject,
        },
      },
      Source: config.aws.email.source, // Use your verified email
    };

    await ses.sendEmail(emailParams).promise();

    res.status(201).json({ message: 'User created successfully and email sent!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

// Login route (unchanged)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    TableName: 'JobSeekersTable',
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

// Fetch jobs route
app.get('/api/jobs', async (req, res) => {
  const { title, location } = req.query;

  // Normalize inputs for case-insensitive matching
  const normalizedTitle = title ? title.toLowerCase() : '';
  const normalizedLocation = location ? location.toLowerCase() : '';

  // Define the parameters for the query
  const params = {
    TableName: 'Jobs', // Replace with your DynamoDB table name
    IndexName: 'title-location-index', // GSI name in DynamoDB
    KeyConditionExpression: '#title = :titleValue', // Query based on exact title
    ExpressionAttributeNames: {
      '#title': 'title', // Original field name for title
    },
    ExpressionAttributeValues: {
      ':titleValue': normalizedTitle, // The value for title from query params
    },
  };

  try {
    // Perform the query operation
    const data = await dynamoDB.query(params).promise();
    let jobs = data.Items; // Extract job data from Items

    // Post-query filtering for substring match in title and location
    jobs = jobs.filter(job => {
      const jobTitleMatch = job.title && job.title.toLowerCase().includes(normalizedTitle);
      const jobLocationMatch = job.location && job.location.toLowerCase().includes(normalizedLocation);
      return jobTitleMatch && (normalizedLocation === '' || jobLocationMatch);
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Could not retrieve jobs' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
