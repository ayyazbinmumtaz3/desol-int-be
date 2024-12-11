import Joi from "joi";

export const carSchema = Joi.object({
    model: Joi.string()
        .strict()
        .trim()
        .min(3)
        .required(),
    price: Joi.number()
        .positive()
        .required(),
    phoneNumber: Joi.string()
        .length(11)
        .required(),
    city: Joi.string()
        .strict()
        .trim()
        .min(2)
        .required(),
    images: Joi.array()
        .items(Joi.string().uri())
        .min(0)
        .max(10).default([])
}).options({ presence: 'required' });
