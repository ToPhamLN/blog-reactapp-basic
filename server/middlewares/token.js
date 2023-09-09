import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    const refreshToken = req.cookies.refreshToken;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: 0,
                    message: 'Token is not valid',
                })
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            status: 0,
            message: "You're not authenticated!"
        });
    }
};


