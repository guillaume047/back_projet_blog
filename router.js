import express from "express";
import { login, logout} from "./controllers/AuthController.js";
import {addUser, updateUser, getUser, randomUser, deleteUser, getUserById,addUserFavorite, showFavorite, supUserFavorite} from "./controllers/UserController.js";
import {logged, checkAdmin} from "./middleware.js";
import {validateBody} from "./middleware.js";
import {addPost, getPostSix,deletePost,getPostAll, updatePost,getPostById,likePost} from './controllers/PostController.js'
import {uploadImgPost} from './controllers/UploadController.js'
import {addComment, countComment} from './controllers/CommentController.js'
import {addTag, getTagAll} from './controllers/TagController.js'
import  multer  from "multer";
const upload = multer();

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
router.post("/upload", upload.single("file"), uploadImgPost);
router.post("/like-post/:id", likePost);
// router.post("/unlike-post/:id", );
router.post('/add-favorite/:id', addUserFavorite);
router.post('/delete-favorite/:id', supUserFavorite);
router.get('/Favorites', showFavorite);

router.post('/comments/add',addComment)
router.post('/comments/count',countComment)
router.post('/tag/add',addTag)
router.get('/tag/all',getTagAll)
// A partir d'ici toutes les routes nécessitent d'être admin
// router.use(checkAdmin));
router.post('/updateUser',validateBody, updateUser);
router.post('/users',validateBody, addUser);
router.delete('/users/:id', deleteUser);


export default router;