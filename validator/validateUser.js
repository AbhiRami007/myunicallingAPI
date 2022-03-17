const Joi = require("joi");
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.validate = validateUser;
