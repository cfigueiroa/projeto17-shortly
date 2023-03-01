import db from '../database/database.connection.js';
import { userExistQuery } from '../queries/urls.queries.js';

export default async function authValidation(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.includes('Bearer ')) {
    return res.status(401).send();
  }
  const token = auth.replace('Bearer ', '');
  const user = (await db.query(userExistQuery(), [token])).rows[0];
  if (!user) {
    return res.status(401).send();
  }
  res.locals.user = user;
  next();
}
