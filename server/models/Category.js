import {dbPool} from '../config/database.js';

export class Category {
    static createCategory = async (data) => {
        const [result] = await dbPool.query('INSERT INTO Categories SET ?', data);
        return result;
    }

    static getCategories = async () => {
        const [result] = await dbPool.query('SELECT * FROM Categories');
        return result;
    }

    static getCategory = async (condition) => {
        const [result] = await dbPool.query('SELECT * FROM Categories WHERE ?', condition);
        return result[0];
    }

    static updateCategory = async (condition, data) => {
        const [result] = await dbPool.query('UPDATE Categories SET ? WHERE ?', [data, condition]);
        return result;
    }

    static deleteCategory = async (condition) => {
        const [result] = await dbPool.query('DELETE FROM Categories WHERE ?', condition);
        return result;
    }

}
