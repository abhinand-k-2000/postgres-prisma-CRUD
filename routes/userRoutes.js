import { Router } from "express";
import {createUser, deleteUser, getUserDetails, getUsers, updateUser} from '../controller/userController.js'
const router = Router();

router.post('/', createUser)
router.put('/:id', updateUser)
router.get('/:id', getUserDetails)
router.get('/', getUsers)
router.delete('/:id', deleteUser)

export default router