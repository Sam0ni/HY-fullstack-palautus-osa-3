const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
},
  number: {
    type: String,
    minlength: 8,
    validate: {
        validator: (val) => {
            const valArr = val.split("-")
            if (valArr.length !== 2 || valArr[0].length > 3 || valArr[0].length < 2) {
                return false
            }
            return True
        },
        message: val => `${val.value} is an invalid number.`
    },
    required: true
  },
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)