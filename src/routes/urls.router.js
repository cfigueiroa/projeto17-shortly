import { Router } from 'express';
import authValidation from '../middlewares/auth.validation.js';
import shortenUrlValidation from '../middlewares/urls.middleware.js';
import * as ct from '../controllers/urls.controller.js';

const router = Router();

// autenticada
router.post('/urls/shorten', shortenUrlValidation, ct.postShortenUrl);
// não autenticada
router.get('/urls/:id', ct.getUrlById);
// não autenticada
router.get('/urls/open/:shortUrl', ct.getShortUrl);
// autenticada
router.delete('/urls/:id', authValidation, ct.deleteUrl);

export default router;
