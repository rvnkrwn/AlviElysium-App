import {dbPool} from '../config/database.js';

export class Category {
    static getCategories = async () => {
        const [result] = await dbPool.query('SELECT * FROM Categories');
        return result;
    }
}
