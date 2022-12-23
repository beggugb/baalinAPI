import { Route, Router } from 'express'
import fileController from '../controllers/fileController'

const router = Router()
router.put('/portada/item/:id',fileController.portada)
router.put('/cliente/item/:id',fileController.cliente)
router.put('/f1/item/:id',fileController.f1)
router.put('/f2/item/:id',fileController.f2)
router.put('/f3/item/:id',fileController.f3)
router.put('/f4/item/:id',fileController.f4)
router.put('/usuario/item/:id',fileController.usuario)

export default router;
