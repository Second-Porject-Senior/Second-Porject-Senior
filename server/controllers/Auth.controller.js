require('dotenv').config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require("../database/index");
const JWT_SECRET = process.env.JWT_SECRET;

// Function to register a user
exports.register = async (req, res) => {
    const { email, username, password } = req.body;
console.log(email, username, password);
console.log(User);

    // Validate input fields
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Function to login a user
exports.login = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' can be either username or email
    try {
     
        
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: identifier }, { email: identifier }]
            }
        });
        console.log(identifier, password);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};


