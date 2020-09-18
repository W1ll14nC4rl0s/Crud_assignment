
const Joi = require('@hapi/joi') 

module.exports =  Joi.object({
    name: Joi.string().required(),
    customer: Joi.string().required(),
    due_date: Joi.date(),
    legal_date: Joi.date(),
    fine: Joi.boolean()
})