const { User } = require('../database/index.js'); // Correct import for User model

// Controller for handling user-related operations
const UserController = {
    createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // Ensure req.user exists and has a role
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized action" });
            }

            const user = await User.create({ name, email, password, role });

            res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    },
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll(); // Use Sequelize's findAll
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    // Get a single user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },


    // Update a user by ID
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },
};

module.exports = UserController;