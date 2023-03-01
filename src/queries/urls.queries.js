export const userExistQuery = () => `
  SELECT
    *
  FROM
    users
  WHERE
    token = $1
`;

export const insertUrlQuery = () => `
  INSERT INTO
    urls (url, "shortUrl", user_id)
  VALUES
    ($1, $2, $3) RETURNING id;
`;

export const urlExistQuery = () => `
  SELECT
    *
  FROM
    urls
  WHERE
    id = $1;
`;

export const shortUrlExistQuery = () => `
  SELECT
    *
  FROM
    urls
  WHERE
    "shortUrl" = $1;
`;

export const updateVisitsQuery = () => `
  UPDATE urls
  SET
    visits = $1
  WHERE
    "shortUrl" = $2;
`;

export const userUrlExistQuery = () => `
  SELECT
    *
  FROM
    urls
  WHERE
    id = $1;
    AND user_id = $2;
`;

export const deleteUrlQuery = () => `
  DELETE FROM urls
  WHERE
    id = $1
`;