var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
const res = require('express/lib/response')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.Promise = Promise 
var dbUrl = 'mongodb+srv://Njonjo:ANKiroga23@cluster0.crg2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    category: String,
    image: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

app.post("/adduser", (req, res) => {
    var myData = new Message(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})