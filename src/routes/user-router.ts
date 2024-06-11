import { Request, Response, Router } from 'express';
import UserController from '../controllers/user-controller';
import upload from '../middlewares/multer';
import hashPassword from '../middlewares/hashier';

const userRouter = Router();

userRouter.post('/getById', UserController.findById);
userRouter.get('/getAll', UserController.findAll);
userRouter.post('/register', upload.single("profilePic"), hashPassword, UserController.register);
userRouter.post('/login', hashPassword, UserController.login);
userRouter.post('/update', upload.single("profilePic"), hashPassword, UserController.update);
userRouter.post('/delete', UserController.delete);

export default userRouter;