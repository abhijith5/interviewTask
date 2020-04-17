const express = require('express')
const router = express.Router()
const { Student } = require('../models/student_model')

router.get('/', async (req, res) => {
  Student.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error......'))
})

router.get('/:id', async (req, res) => {
  Student.findById(req.params.id)
    .then(exe => res.json(exe))
    .catch(err => res.status(400).json('Error......'))
})

router.post('/', async (req, res) => {
  console.log(req.body)

  const student = new Student(
    {
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      studentPhoneNumber: req.body.studentPhoneNumber
    })

  await student.save()

  res.send("success")
})

router.put('/update/:id', async (req, res) => {

  const updateStudent = await Student.findByIdAndUpdate(req.params.id,
    {
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      studentPhoneNumber: req.body.studentPhoneNumber
    },
    {
      new: true
    }
  )
  if (!updateStudent) return res.status(404).send('The Student with the given ID was not found')

  res.send(updateStudent);
})


router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  res.status(400).send('No record with given id : ' + req.params.id)

  await Student.findByIdAndRemove(req.params.id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  res.send("Successfully deleted")
})

module.exports = router