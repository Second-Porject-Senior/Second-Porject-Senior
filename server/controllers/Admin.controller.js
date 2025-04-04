require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require("../database/index");
const JWT_SECRET = process.env.JWT_SECRET;


const adminActions = {
    banUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Authentication required.' });
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            const adminId = decoded.id;

            const admin = await User.findByPk(adminId);
            if (admin.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            await user.update({ isBanned: true });
            res.status(200).json({ message: 'User has been banned successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.', error });
        }
    },

    changeUserRole: async (req, res) => {
        try {
            const { userId } = req.params;
            const { newRole } = req.body;
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Authentication required.' });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            const adminId = decoded.id;

            const admin = await User.findByPk(adminId);
            if (admin.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            await user.update({ role: newRole });
            res.status(200).json({ message: 'User role has been updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.', error });
        }
    },
};

module.exports = adminActions;