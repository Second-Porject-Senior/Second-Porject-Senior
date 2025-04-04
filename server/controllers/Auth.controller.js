require('dotenv').config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../database/index");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Ensure it's loaded

// Cookie options
const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// 🔹 Register User
exports.register = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        email = email.trim();
        username = username.trim();
        password = password.trim();

        // Validate input
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return res.status(400).json({ error: 'Username can only contain letters and numbers' });
        } else if (!/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        } else if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if user exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({ email, username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

// 🔹 Login User
exports.login = async (req, res) => {
    try {
        let { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ error: 'Email/username and password are required' });
        }
        // Find user
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: identifier }, { email: identifier }]
            }
        });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
        // Create token
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        // Set cookie
        res.cookie("token", token, cookieOptions);
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error during login' });
    }
};

// 🔹 Logout
exports.logout = async (req, res) => {
    res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
    res.json({ message: "Logged out successfully" });
};
