import db from '../database/database.connection.js';
import { userExistQuery } from '../queries/urls.queries.js';

export default async function authValidation(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    res.status(401).send();
    return;
  }
  if (!auth.includes('Bearer ')) {
    res.status(401).send();
    return;
  }
  const token = auth.replace('Bearer ', '');
  const user = (await db.query(userExistQuery(), [token])).rows[0];
  if (!user) {
    res.status(401).send();
    return;
  }
  res.locals.user = user;
  next();
}
