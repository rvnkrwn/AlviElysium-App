import {Category} from '../models/Category.js';

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = await  Category.createCategory(data);
        return res.status(201).json({message: 'Successfully created category'});
    } catch (e) {
        return res.status(400).json({message: 'Failed create category'});
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.getCategories();
        if (!categories.length > 0) {
            return res.status(404).json({message: 'Categories is empty'});
        }
        return res.status(201).json(categories);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.getCategory();
        if (!categories.length > 0) {
            return res.status(404).json({message: 'Categories is empty'});
        }
        return res.status(201).json(categories);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}
