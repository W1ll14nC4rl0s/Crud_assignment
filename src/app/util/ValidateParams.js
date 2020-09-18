const Joi = require('@hapi/joi')

const schemaValidate = Joi.object({
    name: Joi.string(),
    customer: Joi.string(),
    due_date: Joi.date(),
    legal_date: Joi.date(),
    fine: Joi.boolean()
})

module.exports = {
    schemaValidate
}
