import Joi from 'joi';

export const userCreateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have a minimum length of 3 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password cannot be an empty field',
    'string.min': 'Password should have a minimum length of 6 characters',
    'any.required': 'Password is required',
  }),
});

export const userUpdateSchema = Joi.object({
  id: Joi.number().required().messages({
    'number.base': 'ID should be a type of number',
    'any.required': 'ID is required',
  }),
  name: Joi.string().min(3).max(50).optional().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have a minimum length of 3 characters',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email should be a type of string',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password cannot be an empty field',
    'string.min': 'Password should have a minimum length of 6 characters',
  }),
});
