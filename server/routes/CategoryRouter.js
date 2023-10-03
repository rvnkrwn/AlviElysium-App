import express from 'express';
import {getCategories} from '../controllers/CategoryController.js';
const CategoryRouter = express.Router();

CategoryRouter.get('/categories', getCategories);

export default CategoryRouter;
