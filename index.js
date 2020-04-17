const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/studentDB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to Mongodb'))

const student = require('./routes/students')
app.use('/api/student', student)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))