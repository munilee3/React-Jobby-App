const User = require("../models/Allmodel.js");
const jwt = require("jsonwebtoken")
const dotEnv = require('dotenv')

dotEnv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({message: "Access Denied"});
        try {
            const verifyToken = jwt.verify(token, process.env.secretKey);
            const user = User.findById(verifyToken.userId);
            if (!user) {
                return res.status(400).json({message: "User not found"});
            }
            req.user = user._id;
            next();
        } catch(error) {
            console.error("Error verifying token:", error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

}

module.exports = verifyToken;