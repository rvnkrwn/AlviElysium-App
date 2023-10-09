import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {
    createUser,
    deleteProfile,
    getProfile,
    getUserByUsername,
    getUsers,
    loginUser,
    updateProfile
} from '../controllers/UserController.js';

const UserRouter = express.Router();

// create
UserRouter.post('/users/register', createUser);

// read
UserRouter.post('/users/login', loginUser);

UserRouter.get('/users', getUsers);
UserRouter.get('/users/:username', getUserByUsername);

UserRouter.get('/profile', authMiddleware, getProfile);

// update
UserRouter.put('/profile', authMiddleware, updateProfile);

// delete
UserRouter.delete('/profile', authMiddleware, deleteProfile);
export default UserRouter;
