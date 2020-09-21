
const baseJoi = require('@hapi/joi') 
const extensionJoi = require('@hapi/joi-date');
const Joi = baseJoi.extend(extensionJoi)

const validBody =  Joi.object({

    name: Joi.string().required(),
    customer: Joi.string().required(),
    due_date: Joi.date().format('YYYY-MM-DD').required(),
    legal_date: Joi.date().format('YYYY-MM-DD').min(Joi.ref('due_date')).required(),

})

const validDocument = Joi.object({
    document: Joi.string().required()
})

module.exports = {
    validDocument,
    validBody
}