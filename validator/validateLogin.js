const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .regex(/\S+@\S+\.\S+/)
      .messages({ "string.pattern.base": `User email is invalid!` }),

    password: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.validate = validateLogin;
