import { shortenUrlSchema } from '../schemas/url.schema.js';
import db from '../database/database.connection.js';
import { userExistQuery } from '../queries/urls.queries.js';

export default async function shortenUrlValidation(req, res, next) {
  const { error } = shortenUrlSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  const auth = req.headers.authorization;
  if (auth === undefined) {
    return res.status(401).send();
  }
  if (!auth.includes('Bearer ')) {
    return res.status(401).send();
  }
  const token = auth.replace('Bearer ', '');
  const user = await db.query(userExistQuery(), [token]).rows[0];
  if (!user) {
    return res.status(401).send();
  }
  res.locals.user = user;
  next();
}
