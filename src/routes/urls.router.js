import { Router } from 'express';
import auth from '../middlewares/auth.validation.js';
import * as ct from '../controllers/urls.controller.js';
import { urlSchema } from '../schemas/url.schema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';

const router = Router();

router.post('/urls/shorten', auth, validateSchema(urlSchema), ct.postUrl);
router.get('/urls/:id', ct.getUrlById);
router.get('/urls/open/:shortUrl', ct.getShortUrl);
router.delete('/urls/:id', auth, ct.deleteUrl);

export default router;
