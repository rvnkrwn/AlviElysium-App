import {Story} from '../models/Story.js';
import multer from 'multer';
import path from 'path';
import url from 'url';
import * as fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/cover/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const upload = multer({storage: storage});
export const createStory = async (req, res) => {
    try {
        const {title, category_id, description} = req.body;
        const {filename} = req.file;
        const {id} = req.user;
        if (!title || !category_id || !description || !filename || !id) {
            return res.status(400).json({message: 'Please fill all fields required'});
        }

        const data = {
            user_id: id,
            category_id,
            title,
            cover: process.env.BASE_URL + '/uploads/cover/' + filename,
            description
        }

        const story = await Story.createStory(data);

        return res.status(201).json({message: 'Successfully created story', story_id: story.insertId})
    } catch (e) {
        return res.status(400).json({message: 'Failed create story', e});
    }
}

export const getStories = async (req, res) => {
    try {
        const stories = await Story.getStories();
        if (!stories.length > 0) {
            return res.status(204).json({message: 'Stories is empty'});
        }
        return res.status(200).json(stories);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getCover = async (req, res) => {
    try {
        const filename = req.params.filename;
        const __filename = url.fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '../uploads/cover/', filename);
        res.status(200).sendFile(filePath);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}


export const getStory = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Story.getStory({id});
        const story = data[0]
        if (!story) {
            return res.status(404).json({message: 'Stories is empty'});
        }
        return res.status(200).json(story);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const updateStory = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        await Story.updateStory(id, data);
        return res.status(200).json({message: 'Successfully updated cover story'});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const updateCoverStory = async (req, res) => {
    try {
        const {id} = req.params;
        const {filename} = req.file;

        const dataStory = await Story.getStory({id});
        const {cover} = dataStory[0];
        const filePath = '.'+(new URL(cover).pathname);

        // delete file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Gagal menghapus file:', err);
                return;
            }
            console.log('File berhasil dihapus');
        });

        const payload = {cover: process.env.BASE_URL + '/uploads/cover/' + filename}
        await Story.updateStory(id, payload);
        return res.status(200).json({message: 'Successfully updated cover story'});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const deleteStory = async (req, res) => {
    try {
        const {id} = req.params;
        await Story.deleteStory(id);
        return res.status(200).json({message: 'Successfully deleted story'});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
