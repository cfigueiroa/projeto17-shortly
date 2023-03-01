import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/database.connection.js';
import {
  getUserMeQuery,
  signInQuery,
  signUpQuery,
  topTenQuery,
  userUrlsQuery,
} from '../queries/user.queries.js';

export async function signUp(_req, res) {
  const { name, email, password } = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await db.query(signUpQuery(), [name, email, passwordHash]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send();
  }
}

export async function signIn(_req, res) {
  const user = res.locals.user;
  const token = uuid();

  try {
    await db.query(signInQuery(), [token, user.id]);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function getUserMe(_req, res) {
  const user = res.locals.user;

  try {
    const sumVisits = (await db.query(getUserMeQuery(), [user.id])).rows[0]
      .visits;
    const userUrls = (await db.query(userUrlsQuery(), [user.id])).rows;
    return res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: sumVisits,
      shortenedUrls: userUrls,
    });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function getUsersRanking(_req, res) {
  try {
    const topTen = await db.query(topTenQuery());
    return res.status(200).send(topTen.rows);
  } catch (error) {
    return res.status(500).send();
  }
}
