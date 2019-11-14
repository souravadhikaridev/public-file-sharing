const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require("morgan")
const cors = require('cors')

const app = express()

//body-parser middleware
app.use(express.static('./routes/public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())
//use view engine
app.set('view engine', 'ejs')

//setup server
var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log('Server is running at ' + port)
})
//setup database
const db = require('./key/databse').mongoURL
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log("Database is connected")
})
.catch((error)=>{
    console.log(error)
})


//brings all resourceibrary route
const rsPublicRoute = require('./routes/api/publicRoute')
const rsFile = require('./routes/api/file')

//route for resourcelibrart
app.use('/',rsPublicRoute)
app.use('/api/auth/myResource/resourcelibrary/',rsFile)