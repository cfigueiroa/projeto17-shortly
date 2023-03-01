import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import helmet from 'helmet';
import chalk from 'chalk';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(helmet());

app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(chalk.blue(`Server running on port ${PORT}`))
);
