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
    .label('Sifra');

const nameVal = Joi.string()
    .required()
    .min(10)
    .max(40)
    .alphanum()
    .label('Ime');

const phoneNumberVal = Joi.string()
    .required()
    .alphanum()
    .pattern(new RegExp('^(\\+381)[0-9]{9}$'))
    .label('Broj telefona');

const agencyNameVal = Joi.string()
    .required()
    .alphanum()
    .min(10)
    .max(40)
    .label('Ime agencije');

const instagramVal = Joi.string()
    .min(2)
    .pattern(new RegExp('^[a-z._]+$'))
    .label('Instagram');

const twitterVal = Joi.string()
    .min(2)
    .pattern(new RegExp('^[a-z.0-9]+$'))
    .label('Twitter');

const cityValReq = Joi.string()
    .min(2)
    .max(40)
    .label('Grad');


const cityVal = Joi.string()
    .required()
    .min(2)
    .max(40)
    .label('Grad');

export const userLoginSchema = Joi.object({
    email: emailVal,
    password: passwordVal
});

export const userRegisterSchema = Joi.object({
    name: nameVal,
    email: emailVal,
    phoneNumber: phoneNumberVal,
    password: passwordVal
});

export const agencyRegisterSchema = Joi.object({
    name: nameVal,
    email: emailVal,
    phoneNumberVal: phoneNumberVal,
    password: passwordVal
});

export const agencyLoginSchema = Joi.object({
    email: emailVal,
    password: passwordVal
});