const Joi = require("joi");

const registerValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must be at most 50 characters",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 3 characters",
    "string.max": "Last name must be at most 50 characters",
    "any.required": "Last name is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid Iranian mobile number",
      "any.required": "Mobile number is required",
    }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

module.exports = { registerValidationSchema, loginValidationSchema };
