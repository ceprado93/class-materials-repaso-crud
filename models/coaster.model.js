const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    name: String,
    description: String,
    inversions: Number,
    length: Number,
    active: Boolean,
    park: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Park'
    },


}, {
    timestamps: true
})

const Coaster = mongoose.model('Coaster', coasterSchema)
module.exports = Coaster