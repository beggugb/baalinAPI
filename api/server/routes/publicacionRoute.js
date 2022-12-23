import { Router } from 'express';
import publicacionController from '../controllers/publicacionController.js';

const router = Router();

/*router.get('/data/:page/:num/:prop/:value',publicacionController.data)
router.post('/search/lista',publicacionController.search)

router.put('/:id/:tipo',publicacionController.update)
router.get('/item/:id',publicacionController.item)*/

router.get('/item/:id',publicacionController.item)
router.post('/data/list',publicacionController.getData)
router.put('/:id/:tipo',publicacionController.update)
router.post('/:tipo',publicacionController.create)

export default router;