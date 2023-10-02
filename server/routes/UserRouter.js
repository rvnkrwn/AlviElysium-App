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

UserRouter.use(authMiddleware);

UserRouter.get("/profile", getProfile);
UserRouter.put("/profile", updateProfile);
UserRouter.delete("/profile", deleteProfile);
export default UserRouter;
