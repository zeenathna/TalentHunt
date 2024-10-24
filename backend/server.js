const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const bcrypt = require('bcryptjs'); 
const uuid = require('uuid').v4; 
const jwt = require('jsonwebtoken'); 
const emailTemplate = require('./config/emailTemplate'); 
const config = require('./config/config'); 
require('dotenv').config();

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
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Signup route
app.post('/api/signup-job-seeker', upload.single('resume'), async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const signupDate = new Date().toISOString();

    if (!req.file) {
        return res.status(400).json({ error: 'Resume file is required' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const fileName = `${uuid()}_${req.file.originalname}`;
        const s3Params = {
            Bucket: 'jobseeekerresumes',
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const s3Data = await s3.upload(s3Params).promise();

        const params = {
            TableName: 'JobSeekersTable',
            Item: {
                firstName,
                lastName,
                phoneNumber,
                email,
                password: hashedPassword,
                signupDate,
                resumeUrl: s3Data.Location,
            },
        };

        await dynamoDB.put(params).promise();

        const emailParams = {
            Destination: {
                ToAddresses: [email],
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
            Source: config.aws.email.source,
        };

        await ses.sendEmail(emailParams).promise();

        res.status(201).json({ message: 'User created successfully and email sent!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not create user' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const params = {
        TableName: 'JobSeekersTable',
        Key: { email },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        const user = result.Item;

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { email: user.email, firstName: user.firstName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not log in' });
    }
});

// Get all jobs route
app.get('/api/jobs', async (req, res) => {
    const { title, location } = req.query;

    const normalizedTitle = title ? title.toLowerCase() : '';
    const normalizedLocation = location ? location.toLowerCase() : '';

    const params = {
        TableName: 'Jobs',
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        let jobs = data.Items;

        jobs = jobs.filter(job => {
            const jobTechSkills = job.techSkills ? job.techSkills.toLowerCase() : '';
            const jobLocation = job.location ? job.location.toLowerCase() : '';

            return (normalizedTitle === '' || jobTechSkills.includes(normalizedTitle)) &&
                   (normalizedLocation === '' || jobLocation.includes(normalizedLocation));
        });

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not retrieve jobs' });
    }
});

// Get job details by Job ID
app.get('/api/jobs/:jobId', async (req, res) => {
    const { jobId } = req.params;

    const params = {
        TableName: 'Jobs',
        Key: {
            jobId,
        },
    };
    
    try {
        const result = await dynamoDB.get(params).promise();
        const job = result.Item;

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not retrieve job details' });
    }
});

// Apply for a job
app.post('/api/jobs/apply', async (req, res) => {
    const { jobId, jobTitle, email, dateApplied, emailSent } = req.body;

    if (!jobId || !jobTitle || !email) {
        return res.status(400).json({ error: 'Job ID, Job Title, and Email are required.' });
    }

    const params = {
        TableName: 'JobsApplied',
        Item: {
            jobId,
            jobTitle,
            email,
            dateApplied: dateApplied || new Date().toISOString(),
            emailSent: emailSent || false,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: 'Job application stored successfully!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not store job application' });
    }
});

// Add jobs
app.post('/api/addjobs', async (req, res) => {
    const {
        jobId,
        category,
        companyName,
        companyDetails,
        contactId,
        createdBy,
        createdDate,
        description,
        education,
        isActive,
        location,
        partFullTime,
        role,
        sponsorship,
        techSkills,
        title,
        visaStatus,
        workExperience,
        workMode,
    } = req.body;

    const params = {
        TableName: 'Jobs',
        Item: {
            jobId,
            category,
            companyName,
            companyDetails,
            contactId,
            createdBy,
            createdDate,
            description,
            education,
            isActive,
            location,
            partFullTime,
            role,
            sponsorship,
            techSkills,
            title,
            visaStatus,
            workExperience,
            workMode,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(200).json({ message: 'Job added successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not add job' });
    }
});

// Get applied jobs for a job seeker
app.get('/api/applied-jobs', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const params = {
        TableName: 'JobsApplied',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        const appliedJobs = data.Items;

        if (appliedJobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found for this user' });
        }

        res.status(200).json(appliedJobs);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Could not retrieve applied jobs' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
