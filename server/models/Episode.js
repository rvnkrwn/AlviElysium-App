import {dbPool} from '../config/database.js';

export class Episode {
    static createEpisode = async (data) => {
        const [result] = await dbPool.query('INSERT INTO Episodes SET ?', data);
        return result;
    }

    static getEpisodes = async (condition) => {
        const [result] = await dbPool.query('SELECT * FROM Episodes WHERE ?', condition);
        return result;
    }

    static updateEpisodes = async (condition, data) => {
        const [result] = await dbPool.query('UPDATE Episodes SET ? WHERE ?', [data,condition]);
        return result;
    }

    static deleteEpisode = async (id) => {
        const [result] = await dbPool.query('DELETE FROM Episodes WHERE id = ?', id);
        return result;
    }
}
