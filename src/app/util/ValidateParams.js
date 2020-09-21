const baseJoi = require('@hapi/joi') 
const extensionJoi = require('@hapi/joi-date');
const Joi = baseJoi.extend(extensionJoi)

const schemaValidate = Joi.object({
    name: Joi.string(),
    customer: Joi.string(),
    due_date: Joi.date().format('YYYY-MM-DD'),
    legal_date: Joi.date().format('YYYY-MM-DD'),
    fine: Joi.boolean()
})

const schemaValidateQuery = Joi.object({
   _id: Joi.string().required()
})

const schemaValidateDeleteDocuments = Joi.object({
    _id: Joi.string().required(),
    document: Joi.string().required()
 })

module.exports = {
    schemaValidate,
    schemaValidateQuery,
    schemaValidateDeleteDocuments
}
