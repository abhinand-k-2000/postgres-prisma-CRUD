import { Router } from "express";
import { createPost, updatePost } from "../controller/postController.js";
const router = Router();



router.post('/', createPost)
router.put('/:id', updatePost)

export default router