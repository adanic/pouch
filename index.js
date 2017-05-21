'use strict';

var express = require('express')
var path = require('path')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

var index = require('./routes/index')
var balance = require('./routes/balance')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)
app.use('/balance', balance)

app.listen(3000, function () {
  console.log('Pouch listening on port 3000!')
})
