import {dbPool} from '../config/database.js';

export class Story {
    static createStory = async (data) => {
        const [result] = await dbPool.query('INSERT INTO Stories SET ?', data);
        return result;
    }

    static getStories = async () => {
        const query = `SELECT S.id        AS story_id,
                                       S.title,
                                       S.cover,
                                       S.description,
                                       S.created_at,
                                       S.updated_at,
                                       U.id        AS user_id,
                                       U.username,
                                       C.id        AS category_id,
                                       C.name      AS category_name,
                                       COUNT(E.id) AS total_episode
                                FROM Stories AS S
                                         LEFT JOIN Users U on S.user_id = U.id
                                         LEFT JOIN Categories C on S.category_id = C.id
                                         LEFT JOIN Episodes E on S.id = E.story_id
                                GROUP BY S.id,
                                         S.title,
                                         S.cover,
                                         S.description,
                                         S.created_at,
                                         S.updated_at,
                                         U.id,
                                         U.username,
                                         C.id,
                                         C.name;`
        const [result] = await dbPool.query(query);
        return result;
    }

    static getStory = async (condition) => {
        const query = `SELECT S.id        AS story_id,
                                       S.title,
                                       S.cover,
                                       S.description,
                                       S.created_at,
                                       S.updated_at,
                                       U.id        AS user_id,
                                       U.username,
                                       C.id        AS category_id,
                                       C.name      AS category_name,
                                       COUNT(E.id) AS total_episode
                                FROM Stories AS S
                                         LEFT JOIN Users U on S.user_id = U.id
                                         LEFT JOIN Categories C on S.category_id = C.id
                                         LEFT JOIN Episodes E on S.id = E.story_id
                                WHERE S. ?
                                GROUP BY S.id,
                                         S.title,
                                         S.cover,
                                         S.description,
                                         S.created_at,
                                         S.updated_at,
                                         U.id,
                                         U.username,
                                         C.id,
                                         C.name;`
        const [result] = await dbPool.query(query, condition);
        return result;
    }

    static updateStory = async (id, data) => {
        const [result] = await dbPool.query('UPDATE Stories SET ? WHERE id = ?', [data, id]);
        return result;
    }

    static deleteStory = async (id) => {
        const [result] = await dbPool.query('DELETE FROM Stories WHERE id = ?', id);
        return result;
    }

}
