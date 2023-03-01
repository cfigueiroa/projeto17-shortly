import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { userSchema, loginSchema } from '../schemas/user.schema.js';
import auth from '../middlewares/auth.validation.js';
import * as mw from '../middlewares/user.middleware.js';
import * as ct from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', validateSchema(userSchema), mw.user, ct.signUp);
router.post('/signin', validateSchema(loginSchema), mw.signIn, ct.signIn);
router.get('/users/me', auth, ct.getUserMe);
router.get('/ranking', ct.getUsersRanking);

export default router;
