import { Router } from 'express';
import authValidation from '../middlewares/auth.validation.js';
import * as mw from '../middlewares/user.middleware.js';
import * as ct from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', mw.userValidation, ct.signUp);
router.post('/signin', mw.signInValidation, ct.signIn);
router.get('/users/me', authValidation, ct.getUserMe);
router.get('/ranking', ct.getUsersRanking);

export default router;
