const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "First Name is not allowed to be empty",
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Last Name is not allowed to be empty",
    "any.required": "Last Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is not allowed to be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(50).required().messages({
    "string.empty": "Password is not allowed to be empty",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max":
      "Password must be less than or equal to {#limit} characters long",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is not allowed to be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(50).required().messages({
    "string.empty": "Password is not allowed to be empty",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max":
      "Password must be less than or equal to {#limit} characters long",
    "any.required": "Password is required",
  }),
});

const updateSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "First Name is not allowed to be empty",
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Last Name is not allowed to be empty",
    "any.required": "Last Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is not allowed to be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
};
