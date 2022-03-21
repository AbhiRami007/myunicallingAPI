const Joi = require("joi");
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "any.base": `Name is required`,
      "array.min": `Name is minimum 3 characters long`,
      "any.empty": `Name is required`,
      "any.required": `Name is required`,
    }),
    email: Joi.string()
      .regex(/\S+@\S+\.\S+/)
      .messages({ "string.pattern.base": `User email is invalid!` }),
    phone: Joi.number().min(10).required().messages({
      "any.base": `Phone number is required`,
      "array.min": `Phone number is minimum 10 characters long`,
      "any.empty": `Phone number is required`,
      "any.required": `Phone number is required`,
    }),
    password: Joi.string().min(8).required().messages({
      "any.base": `Password is required`,
      "array.min": `Password should be minimum 8 characters long`,
      "any.empty": `Password is required`,
      "any.required": `Password is required`,
    }),
    confirmPassword: Joi.string().required(),
    userRole: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.validate = validateUser;