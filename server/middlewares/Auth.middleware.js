const jwt = require("jsonwebtoken");
const { User } = require("../database/index.js");

exports.isAdmin = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded.role)
        return decoded.role === "admin";  
    } catch (error) {
        return false;  
    }
};


exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};