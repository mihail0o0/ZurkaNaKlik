import Joi from 'joi';

const emailVal = Joi.string()
    .required()
    .email()
    .alphanum()
    .label('Email');

const passwordVal = Joi.string()
    .required()
    .min(8)
    .max(30)
    .alphanum()
    .label('Password');

const nameVal = Joi.string()
    .required()
    .min(10)
    .max(40)
    .alphanum()
    .label('Name');

const phoneNumberVal = Joi.string()
    .required()
    .alphanum()
    .pattern(new RegExp('^(\+381)[0-9]{9}$'))
    .label('Phone Number');


export const userLoginSchema = Joi.object({
    email: emailVal,
    password: passwordVal
});

export const userRegisterSchema = Joi.object({
    email: emailVal,
    password: passwordVal
});