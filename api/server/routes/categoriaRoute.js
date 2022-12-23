import { Router } from 'express';
import categoriaController from '../controllers/categoriaController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',categoriaController.data)
router.post('/search/lista',categoriaController.search)
router.post('/:tipo',categoriaController.create)
router.put('/:id/:tipo',categoriaController.update)
router.get('/item/:id',categoriaController.item)
router.get('/listas/items',categoriaController.getItems)
export default router;