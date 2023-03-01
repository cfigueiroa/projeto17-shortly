import joi from 'joi';

export const shortenUrlSchema = joi.object({
  url: joi.string().uri().required(),
});
