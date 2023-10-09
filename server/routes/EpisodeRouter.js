import express from 'express';
import {createEpisode, deleteEpisode, getEpisodes, updateEpisode} from '../controllers/EpisodeController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const EpisodeRouter = express.Router();

// create
EpisodeRouter.post('/episodes', authMiddleware, createEpisode);

// read
EpisodeRouter.get('/episodes/:story_id', getEpisodes);

// update
EpisodeRouter.put('/episodes/:id', authMiddleware, updateEpisode);

// delete
EpisodeRouter.delete('/episodes/:id', authMiddleware, deleteEpisode);

export default EpisodeRouter;
