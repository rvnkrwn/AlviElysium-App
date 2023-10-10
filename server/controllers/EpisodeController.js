import {Episode} from '../models/Episode.js';
import {Story} from '../models/Story.js';
import User from '../models/User.js';

export const createEpisode = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user
        const stories = await Story.getStory({id: data.story_id});
        const {user_id} = stories[0];
        if (user.id !== user_id) {
            return res.status(400).json({message: "Error to correct user id"})
        }
        await Episode.createEpisode(data);
        return res.status(201).json({message: "Successfully added episode"});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}


export const getEpisodes = async (req, res) => {
    try {
        const {story_id} = req.params;
        const episodes = await Episode.getEpisodes({story_id});
        return res.status(200).json(episodes);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

export const getEpisode = async (req, res) => {
    try {
        const {id} = req.params;
        const episode = await Episode.getEpisodes({id});
        return res.status(200).json(episode[0]);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

export const updateEpisode = async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        const data = req.body;
        const episodes = await Episode.getEpisodes({id});
        const {story_id} = episodes[0]
        const stories = await Story.getStory({id: story_id});
        const {user_id} = stories[0]

        if (user.id !== user_id) {
            return res.status(400).json({message: "Error to correct user id"})
        }
        await Episode.updateEpisodes({id}, data);
        return res.status(200).json({message: "Successfully update episode"});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}


export const deleteEpisode = async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        const episodes = await Episode.getEpisodes({id});
        const {story_id} = episodes[0]
        const stories = await Story.getStory({id: story_id});
        const {user_id} = stories[0]

        if (user.id !== user_id) {
            return res.status(400).json({message: "Error to correct user id"})
        }
        await Episode.deleteEpisode(id);
        return res.status(200).json({message: "Successfully deleted episode"});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}
