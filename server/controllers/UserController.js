import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
export const createUser = async (req, res) => {
    try {
        const {full_name, birthday, username, email, password} = req.body;
        const passwordV2 = await bcrypt.hashSync(password, 10);
        const data = {
            full_name: full_name,
            birthday: birthday,
            username: username,
            email: email,
            password: passwordV2
        }
        await User.create(data)
        return res.status(201).json({message: 'Successfully created user'});
    } catch (e) {
        return res.status(400).json({message: 'Failed create user'});
    }
}

export const getAllUser = async (req, res) => {
    try {
        const response = await User.getAll();
        return res.status(200).json({users: response});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
export const getUserById = async (req, res) => {
    try {
        const {user_id} = req.user;
        console.log(req.user)
        const response = await User.getById(user_id);
        return res.status(200).json({user: response});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const {username} = req.params;
        const response = await User.getByUsername(username);
        return res.status(200).json({user: response});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const {password, ...response} = await User.getByEmail(email);
        return res.status(200).json({user: response});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const response = await User.getByEmail(email);
        if (!response) {
            return res.status(401).json({message: 'Email or password is invalid'});
        }
        const match = await bcrypt.compareSync(password, response.password);
        if (!match) {
            return res.status(401).json({message: 'Email or password is invalid'});
        }
        const data = {
            user_id: response.user_id,
            username: response.username
        }
        const token = await jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'});
        console.log(token)
        return res.status(200).json({message: 'Successfully Login', token});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const updateUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const {password, ...data} = req.body;
        const response = await User.updateById(id, data);
        if (response.changedRows > 0) {
            return res.status(200).json({message: 'Successfully updated user'});
        }
        return res.status(204).json({message: 'Operation successful, but no changes were applied as the values were already the same.'});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}


export const deleteUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await User.deleteById(id);
        if (response.affectedRows) {
            return res.status(200).json({message: 'Successfully deleted user'});
        }
        return res.status(404).json({message: 'User not found'});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

