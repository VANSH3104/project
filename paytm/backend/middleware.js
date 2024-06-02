const JWT_SECRET = require("./config");
const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const token = authHeader.split(" ")[1];
    try {
        console.log(jwt)
        const decoded = jwt.decode(token, JWT_SECRET);
        req.userId = decoded.id;
        
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = {
    authMiddleware
};
