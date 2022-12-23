import { Router } from 'express';
import publicacionController from '../controllers/publicacionController.js';

const router = Router();

router.post('/data',publicacionController.consulta)
router.get('/last/:ciudad',publicacionController.last)
router.get('/item/:id',publicacionController.consultaItem)
router.get('/all/:page/:num',publicacionController.consultaAll)
export default router;