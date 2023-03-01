import { userSchema, loginSchema } from '../schemas/user.schema.js';
import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { userExistQuery } from '../queries/user.queries.js';

export async function userValidation(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const userExist = await db.query(userExistQuery(), [user.email]);
    if (userExist.rowCount > 0) {
      res.status(409).send();
      return;
    }
  } catch (error) {
    res.status(500).send();
  }
  res.locals.user = user;
  next();
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const userExist = await db.query(userExistQuery(), [email]);
    if (userExist.rowCount <= 0) {
      res.status(401).send();
      return;
    }
    const passwordOk = bcrypt.compareSync(password, userExist.rows[0].password);
    if (!passwordOk) {
      res.status(401).send();
      return;
    }
    const user = userExist.rows[0];
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send();
  }
}
