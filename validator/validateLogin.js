const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({ "string.pattern.base": `User email is Required!` }),

    password: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.validate = validateLogin;
