import { nanoid } from 'nanoid';
import db from '../database/database.connection.js';
import {
  deleteUrlQuery,
  insertUrlQuery,
  shortUrlExistQuery,
  updateVisitsQuery,
  urlExistQuery,
  userUrlExistQuery,
} from '../queries/urls.queries.js';

export async function postShortenUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;
  const shortUrl = nanoid();

  try {
    const {
      rows: [{ id }],
    } = await db.query(insertUrlQuery(), [url, shortUrl, user.id]);

    return res.status(201).send({ id, shortUrl });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const {
      rows: [urlExist],
    } = await db.query(urlExistQuery(), [id]);
    if (!urlExist) {
      return res.status(404).send();
    }

    return res.status(200).send(urlExist);
  } catch (error) {
    return res.status(500).send();
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const {
      rows: [shortUrlExist],
    } = await db.query(shortUrlExistQuery(), [shortUrl]);
    if (!shortUrlExist) {
      return res.status(404).send();
    }

    await db.query(updateVisitsQuery(), [
      Number(shortUrlExist.visits) + 1,
      shortUrlExist.shortUrl,
    ]);

    return res.redirect(shortUrlExist.url);
  } catch (error) {
    return res.status(500).send();
  }
}

export async function deleteUrl(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const {
      rows: [urlExist],
    } = await db.query(urlExistQuery(), [id]);
    if (!urlExist) {
      return res.status(404).send();
    }

    const {
      rows: [userUrlExist],
    } = await db.query(userUrlExistQuery(), [id, user.id]);
    if (!userUrlExist) {
      return res.status(401).send();
    }

    await db.query(deleteUrlQuery(), [userUrlExist.id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
}
