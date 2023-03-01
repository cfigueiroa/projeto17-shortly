import { Router } from 'express';
import authValidation from '../middlewares/auth.validation.js';
import shortenUrlValidation from '../middlewares/urls.middleware.js';
import * as ct from '../controllers/urls.controller.js';

const router = Router();

router.post('/urls/shorten', shortenUrlValidation, ct.postShortenUrl);
router.get('/urls/:id', ct.getUrlById);
router.get('/urls/open/:shortUrl', ct.getShortUrl);
router.delete('/urls/:id', authValidation, ct.deleteUrl);

export default router;
