import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization){
            return res.status(401).json({message: "Please using authorization"});
        }
        const token = authorization.split(' ')[1];
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getUser({id});
        if (!user) {
            return res.status(401).json({message: "Token is invalid"})
        }
        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
