var express = require('express') //express package
var bodyParser = require('body-parser') //body parser package
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json()) //we expect json to be coming in
app.use(bodyParser.urlencoded({extended: false}))

var messages =[
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'},
]

app.get('/messages', (req, res)=>{
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    
    messages.push(req.body)
    res.sendStatus(200)
})

var server = app.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})