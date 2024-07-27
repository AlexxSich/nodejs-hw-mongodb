import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit} characters',
    'string.max': 'Name should be no longer than {#limit} characters',
    'any.required': 'Name is required',
  }),

  phoneNumber: Joi.string().min(10).max(20).required().messages({
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit} characters',
    'string.max': 'Name should be no longer than {#limit} characters',
  }),

  phoneNumber: Joi.string().min(10).max(20),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
