import mongoose from "mongoose";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    useCreateIndex: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  contact: String,
  role: {
    type: Number,
    default: 2,
  },
});
userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

//validating Users
export function validateUserSignUp(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(5).required(),
    contact: Joi.string().length(11).regex(/^\d+$/),
    role: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}

export function validateUserLoginSchema(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

export function validateUserUpdateSchema(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20),
    password: Joi.string().min(5),
    contact: Joi.string().length(11).regex(/^\d+$/),
    role: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
export const User = mongoose.model("User", userSchema);
