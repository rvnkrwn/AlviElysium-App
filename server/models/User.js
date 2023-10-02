import {dbPool} from '../config/database.js';

class User {
    static createUser = async (data) => {
        const [result] = await dbPool.query('INSERT INTO Users SET ?', data);
        return result;
    }

    static getUsers = async () => {
        const [result] = await dbPool.query('SELECT * FROM Users');
        return result;
    }

    static getUser = async (condition) => {
        const [result] = await dbPool.query('SELECT * FROM Users WHERE ?', condition);
        return result[0];
    }

    static updateUser = async (condition, data) => {
        const [result] = await dbPool.query('UPDATE Users SET ? WHERE ?', [data, condition]);
        return result;
    }

    static deleteUser = async (condition) => {
        const [result] = await dbPool.query('DELETE FROM Users WHERE ?', condition);
        return result;
    }
}

export default User;
