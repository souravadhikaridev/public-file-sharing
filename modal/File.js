const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
    originalname:{
        type: String
    },
    filename:{
        type:String
    },
    code:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

const InstructorSchema = mongoose.model('File',newSchema)
module.exports = InstructorSchema