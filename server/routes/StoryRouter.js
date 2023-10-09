import express from 'express';
import {
    createStory,
    deleteStory,
    getCover,
    getStories,
    getStory,
    updateCoverStory, updateStory,
    upload
} from '../controllers/StoryController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
const StoryRouter = express.Router();

// create
StoryRouter.post('/stories',authMiddleware, upload.single('cover'), createStory);

// read
StoryRouter.get('/stories',getStories);
StoryRouter.get('/stories/:id', getStory);
StoryRouter.get('/uploads/cover/:filename', getCover);

// update
StoryRouter.patch('/stories/:id', authMiddleware, upload.single('cover'), updateCoverStory);
StoryRouter.put('/stories/:id', authMiddleware, updateStory);

// delete
StoryRouter.delete('/stories/:id', authMiddleware, deleteStory);

export default StoryRouter;
