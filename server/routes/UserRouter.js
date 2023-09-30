import express from 'express';
import {
    createUser,
    deleteUserById,
    getAllUser,
    getUserByEmail,
    getUserById,
    getUserByUsername,
    login,
    updateUserById
} from '../controllers/UserController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const UserRouter = express.Router();

UserRouter.post('/users/register', createUser);
UserRouter.post('/users/login', login);
UserRouter.post('/email/:email', getUserByEmail);

UserRouter.use(authMiddleware);

UserRouter.get('/profile', authMiddleware, getUserById);

export default UserRouter;
