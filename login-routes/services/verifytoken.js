import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).send('Unauthorized Error');
    try {
        const decoded = jwt.verify(token, 'taina');
        req.user = decoded;
    } catch (err) {
        return res.status(403).send('Forbidden Error');
    }
    return next();
};
