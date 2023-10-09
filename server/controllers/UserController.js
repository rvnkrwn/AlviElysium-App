import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Story} from '../models/Story.js';

dotenv.config();
export const createUser = async (req, res) => {
    try {
        const {full_name, birthday, username, email, password} = req.body;
        if (!full_name || !birthday || !username || !email || !password) {
            return res.status(400).json({message: 'Please fill all fields required'});
        }
        const passwordV2 = await bcrypt.hashSync(password, 10);
        const data = {
            full_name: full_name, birthday: birthday, username: username, email: email, password: passwordV2
        }
        const user = await User.createUser(data);
        if (user) {
            return res.status(201).json({message: 'Successfully created user'});
        }
    } catch (e) {
        return res.status(400).json({message: 'Failed create user'});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Please fill all fields required'});
        }
        const condition = {
            email: email
        }
        const user = await User.getUser(condition);
        if (!user) {
            return res.status(401).json({message: 'Email or password is not match'});
        }

        const match = await bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(401).json({message: 'Email or password is not match'});
        }

        const token = await jwt.sign({
            id: user.id, username: user.username,
        }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        return res.status(201).json({message: 'Successfully loggedIn user', token});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.getUsers()
        if (!users.length > 0) {
            return res.status(404).json({message: 'Users is empty'});
        }

        let usersData = [];

        for (const user of users) {
            usersData.push({
                full_name: user.full_name,
                username: user.username,
                create_at: user.create_at
            });
        }
        return res.status(201).json(usersData);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const {username} = req.params;
        const {password, ...user} = await User.getUser({username});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const stories = await Story.getStory({user_id: user.id});
        return res.status(200).json({data: user, stories});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getProfile = async (req, res) => {
    try {
        const {id} = req.user;
        const {password, ...user} = await User.getUser({id});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const stories = await Story.getStory({user_id: id});
        return res.status(200).json({data: user, stories});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {id} = req.user;
        const {new_password, password, ...data} = req.body;
        const userData = await User.getUser({id});
        const match = await bcrypt.compareSync(password, userData.password);
        if (!match) {
            return res.status(401).json({message: 'Password is invalid'});
        }
        if (new_password) {
            data.password = await bcrypt.hashSync(new_password, 10)
        }

        const user = await User.updateUser({id}, data);
        if (user.changedRows) {
            return res.status(200).json({message: "Successfully updated user"})
        }

        return res.status(204).json({message: "Not content to update"})
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const {id} = req.user;
        const {password} = req.body;
        const userData = await User.getUser({id});
        const match = await bcrypt.compareSync(password, userData.password);
        if (!match) {
            return res.status(401).json({message: 'Password is invalid'});
        }
        await User.deleteUser({id})
        return res.status(204).json({message: "Not content to update"})
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
