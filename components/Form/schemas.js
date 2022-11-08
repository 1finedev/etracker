import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  displayName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.ref("password"),
});
