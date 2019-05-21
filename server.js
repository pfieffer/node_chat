var express = require('express') //express package
var bodyParser = require('body-parser') //body parser package
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json()) //we expect json to be coming in
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://user:user@cluster0-kwipy.mongodb.net/test?retryWrites=true'

var messages =[
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'},
]

app.get('/messages', (req, res)=>{
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})