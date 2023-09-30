import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization){
            return res.status(401).json({message: "Please using authorization"});
        }
        const token = authorization.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
