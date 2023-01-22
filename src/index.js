
const express = require('express')
const mongoose = require('mongoose')
const rout = require('./router/rout')
const app = express()
const port = process.env.PORT || 4000
const dbURL = 'mongodb://localhost:27017/MoneyApp_Assignment_1'

app.use(express.json())

mongoose.connect(dbURL).then(() => console.log('db is connected')).catch(() => console.log(err.message))

app.get('/test-me', function (req, res) {
    res.send('Hello Er. Namrata Jaiswal, Ready to rock')
})

app.use('/', rout)

app.listen(port, () => {
    console.log(`express app is running on ${port}`)
})