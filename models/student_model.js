const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },
  studentPhoneNumber: {
    type: String,
    required: true
  }
})
const Student = mongoose.model('Student', studentSchema)

exports.Student = Student