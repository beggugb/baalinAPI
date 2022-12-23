import { Router } from 'express';
import favoritoController from '../controllers/favoritoController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',favoritoController.data)
router.post('/search/lista',favoritoController.search)
router.post('/:tipo',favoritoController.create)
router.put('/:id/:tipo',favoritoController.update)
router.get('/item/:id',favoritoController.item)
router.get('/listas/items',favoritoController.getItems)
export default router;