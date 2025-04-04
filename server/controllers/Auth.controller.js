require('dotenv').config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../database/index");
const JWT_SECRET = process.env.JWT_SECRET;

// Cookie options
const cookieOptions = {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Protect against CSRF
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
};

// Function to register a user
exports.register = async (req, res) => {
    let { email, username, password } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();

    // Validate input fields
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ error: 'Username can only contain letters and numbers' });
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    } else if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    try {
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Function to login a user
exports.login = async (req, res) => {
    const { identifier, password } = req.body;
    identifier = identifier.trim();
    password = password.trim();
    // Validate input fields
    if (!identifier || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        // Find the user by either username or email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create and sign JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
            //   ...cookieOptions,
            //   maxAge: 15 * 60 * 1000 // 15 minutes
        });

        // Send response without including the token in the body
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error during login' });
    }
};

// Function to logout
exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            ...cookieOptions,
            maxAge: 0
        });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Error during logout' });
    }
};
