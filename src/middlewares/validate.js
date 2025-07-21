const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = validate;
