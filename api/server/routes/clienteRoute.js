import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';

const router = Router();

/*router.get('/data/:page/:num/:prop/:value',clienteController.dataClientes)
router.post('/search/lista',clienteController.searchCliente)
router.post('/:tipo',clienteController.saveCliente)
router.put('/:id/:tipo',clienteController.setUpdate)
router.get('/item/:id',clienteController.getItem)
router.get('/listas/items',clienteController.getItems)*/




router.post('/data/list',clienteController.getData)
router.get('/item/:id',clienteController.getItem)
router.put('/:id/:tipo',clienteController.setUpdate)
/*router.post('/:tipo',clienteController.setCreate)
router.post('/delete/item/list',clienteController.setDelete)
router.post('/search/lista',clienteController.getSearch)*/

router.post('/login/user',clienteController.loginCliente)
export default router;