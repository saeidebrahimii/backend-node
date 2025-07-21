const Joi = require("joi");

const editUserValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must be at most 50 characters",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().min(2).max(50).optional().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 3 characters",
    "string.max": "Last name must be at most 50 characters",
    "any.required": "Last name is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  mobile: Joi.string()
    .pattern(/^09\d{9}$/)
    .optional()
    .messages({
      "string.pattern.base": "Please enter a valid Iranian mobile number",
      "any.required": "Mobile number is required",
    }),

  password: Joi.string().min(8).optional().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

module.exports = { editUserValidationSchema };
