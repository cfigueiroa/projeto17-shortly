export const userExistQuery = () => `
  SELECT
    *
  FROM
    users
  WHERE
    email = $1
`;

export const signUpQuery = () => `
  INSERT INTO
    users (name, email, password)
  VALUES
    ($1, $2, $3);
`;

export const signInQuery = () => `
  UPDATE users
  SET
    token = $1
  WHERE
    id = $2;
`;

export const getUserMeQuery = () => `
  SELECT
    SUM(visits) AS visits
  FROM
    urls
  WHERE
    user_id = $1;
`;

export const userUrlsQuery = () => `
  SELECT
    id,
    "shortUrl",
    url,
    visits AS "visitCount"
  FROM
    urls
  WHERE
    user_id = $1;
`;

export const topTenQuery = () => `
  SELECT
    users.id,
    users.name,
    SUM(urls.visits) AS "visitCount",
    COUNT(urls.id) AS "linksCount"
  FROM
    urls
    LEFT JOIN users ON users.id = urls.user_id
  GROUP BY
    users.id
  ORDER BY
    "visitCount" DESC,
    id ASC
  LIMIT
    10;
`;