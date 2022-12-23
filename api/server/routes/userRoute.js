import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',userController.datausers)
router.post('/search/lista',userController.searchuser)
router.post('/:tipo',userController.saveuser)
router.post('/login/user',userController.loginuser)
router.put('/:id/:tipo',userController.setUpdate)
router.get('/item/:id',userController.getItem)
router.get('/listas/items',userController.getItems)
export default router;