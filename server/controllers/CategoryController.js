import {Category} from '../models/Category.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.getCategories();
        console.log(categories)
        if (!categories.length > 0) {
            return res.status(404).json({message: 'Users is empty'});
        }
        return res.status(201).json(categories);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
