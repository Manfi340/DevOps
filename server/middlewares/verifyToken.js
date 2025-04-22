const jwtToken = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
    const token = req.cookies?.token;   
    if(!token){
        return res.status(401).json({ success: false, message: 'Unauthorized access - no token was provided' });
    }
    try{
        const decodedToken = jwtToken.decode(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.userRole;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized access - token is expired or invalid' });
    }
};

module.exports = { VerifyToken };