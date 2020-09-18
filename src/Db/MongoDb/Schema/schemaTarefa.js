const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
	customer: {
        type:String,
        required: true
    },
    due_date: {
        type: Date,
        required: false
    },
	legal_date: {
        type: Date,
        required: false
    },
	fine: {
        type: Boolean,
        required: false
    },
	documents: {
        type: Array,
        required: false
    }
})

module.exports = Mongoose.model('modelAssignment', schema);