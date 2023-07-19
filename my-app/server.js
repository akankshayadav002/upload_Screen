const express = require('express')
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
 
 
//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lappy89",
    database: "test"
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//@type   POST
//route for post data

app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        // var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"

        // db.query(insertData, [imgsrc], (err, result) => {
        //     if (err) throw err
        //     console.log("file uploaded")
        // })
    }
});
 
//create connection
const PORT = process.env.PORT || 3300
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))