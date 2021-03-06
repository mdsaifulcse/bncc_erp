const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer=require('multer')
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');
const routes = require('./api/router')
mongoose.connect('mongodb://localhost/leam_erp', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection
db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Database Connection established.');
})
const app = express()

app.use(morgan('dev'))
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//var server = require('http').Server(app);
app.use(fileUpload({
    createParentPath : true
}));

// upload folder making public (accessible) -------------
app.use('/upload', express.static(__dirname + '/upload'));

// validation --------------- must immediately after bodyParser
app.use(expressValidator())
app.use(express.json());

//Router
routes(app,express)
const PORT  = process.env.PORT || 8002
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
