import { Router } from 'express';
import authValidation from '../middlewares/auth.validation.js';
import * as mw from '../middlewares/user.middleware.js';
import * as ct from '../controllers/user.controller.js';

const router = Router();

// não autenticada
router.post('/signup', mw.userValidation, ct.signUp);
// não autenticada
router.post('/signin', mw.signInValidation, ct.signIn);
// autenticada
router.get('/users/me', authValidation, ct.getUserMe);
// não autenticada
router.get('/ranking', ct.getUsersRanking);

export default router;
