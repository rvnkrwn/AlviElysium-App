import express from 'express';
import {getCategories} from '../controllers/CategoryController.js';
const CategoryRouter = express.Router();

CategoryRouter.post('/categories', getCategories);
CategoryRouter.get('/categories', getCategories);
CategoryRouter.get('/categories/:id', getCategories);
CategoryRouter.put('/categories/:id', getCategories);
CategoryRouter.delete('/categories/:id', getCategories);

export default CategoryRouter;
