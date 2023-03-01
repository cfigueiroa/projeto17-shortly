import { Router } from 'express';
import usersRouter from './users.router.js';
import urlsRouter from './urls.router.js';

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);

export default router;
