import express from "express";
import { login, logout} from "./controllers/AuthController.js";
import {addUser, updateUser, getUser, randomUser, deleteUser, getUserById} from "./controllers/UserController.js";
import {logged, checkAdmin} from "./middleware.js";
import {validateBody} from "./middleware.js";
import {addPost, getPostSix,deletePost,getPostAll, updatePost,getPostById} from './controllers/PostController.js'
const router = express.Router();

router.post('/login', login);
 // A partir d'ici toutes les routes nécessitent d'être connectés a l'appli
router.use(logged);

router.get('/randomUser',randomUser);

router.get('/users', getUser);
router.get('/users/:id', getUserById);

router.get('/logout', logout);

router.get('/posts/:id', getPostById);
router.get('/posts-6', getPostSix);
router.get('/posts', getPostAll);
router.post('/posts/add',addPost)
router.post('/updatePost/:id', updatePost);
router.delete('/posts/:id', deletePost);

// A partir d'ici toutes les routes nécessitent d'être admin
// router.use(checkAdmin));
router.post('/updateUser',validateBody, updateUser);
router.post('/users',validateBody, addUser);
router.delete('/users/:id', deleteUser);


export default router;