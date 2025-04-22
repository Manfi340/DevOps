const jwtToken = require('jsonwebtoken');

const SetUpTokenToCookies = (res, userId, userRole) => {
    const token = jwtToken.sign({userId, userRole}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie('token', token, {
        httpOnly: true,        
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",     
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    return token;
};

module.exports = {SetUpTokenToCookies};