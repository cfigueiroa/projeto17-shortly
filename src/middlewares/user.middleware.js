import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { userExistQuery } from '../queries/user.queries.js';

export async function user(req, res, next) {
  const user = req.body;
  try {
    const userExist = await db.query(userExistQuery(), [user.email]);
    if (userExist.rowCount > 0) {
      return res.status(409).send();
    }
  } catch (error) {
    res.status(500).send();
  }
  res.locals.user = user;
  next();
}

export async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const userExist = await db.query(userExistQuery(), [email]);
    if (userExist.rowCount <= 0) {
      return res.status(401).send();
    }
    const passwordOk = bcrypt.compareSync(password, userExist.rows[0].password);
    if (!passwordOk) {
      return res.status(401).send();
    }
    const user = userExist.rows[0];
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send();
  }
}
