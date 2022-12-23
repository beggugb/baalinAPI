import { Route, Router } from 'express'
import mailController from '../controllers/mailController'

const router = Router()
router.get('/registro',mailController.registro)
router.post('/:tipo',mailController.setCreate)
router.post('/activate/user',mailController.activate)
export default router;
