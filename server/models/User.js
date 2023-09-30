import {dbPool} from '../config/database.js';

class User {
    static create = async (data) => {
        const [result] = await dbPool.query('INSERT INTO Users SET ?', data);
        return result;
    }

    static getAll = async () => {
        const [result] = await dbPool.query('SELECT user_id, full_name, username, email, create_at FROM Users');
        return result;
    }

    static getById = async (id) => {
        const [result] = await dbPool.query('SELECT user_id, full_name, username, email, create_at FROM Users WHERE user_id = ?', id);
        return result[0];
    }

    static getByUsername = async (username) => {
        const [result] = await dbPool.query('SELECT user_id, full_name, username, email, create_at FROM Users WHERE username = ?', username);
        return result[0];
    }

    static getByEmail = async (email) => {
        const [result] = await dbPool.query('SELECT user_id, full_name, username, email, password, create_at FROM Users WHERE email = ?', email);
        return result[0];
    }

    static updateById = async (id, data) => {
        const [result] = await dbPool.query('UPDATE Users SET ? WHERE user_id = ?', [data, id]);
        return result;
    }

    static deleteById = async (id) => {
        const [result] = await dbPool.query('DELETE FROM Users WHERE user_id = ?', id);
        return result;
    }
}

export default User;
