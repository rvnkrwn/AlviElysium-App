import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {
    createUser,
    deleteProfile,
    getProfile,
    getUser,
    getUsers,
    loginUser,
    updateProfile
} from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post("/users/register", createUser);
UserRouter.post("/users/login", loginUser);

UserRouter.get("/users", getUsers);
UserRouter.get("/users/:username", getUser);

UserRouter.get("/profile", authMiddleware, getProfile);
UserRouter.put("/profile", authMiddleware, updateProfile);
UserRouter.delete("/profile", authMiddleware, deleteProfile);
export default UserRouter;
