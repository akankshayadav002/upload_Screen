const express = require('express')
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
 
 
//use express static folder
app.use(cors());
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Database connection
const db = mysql.createConnection({
    host: "localhost",
    port:"3300",
    user: "root",
    password: "Lappy89",
    database: "test1"
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
    
        console.log(req.file.filename)
        const image= req.file.filename;
        const path = "C:\\Users\\Akansha\\Documents\\upload screen\\upload_Screen\\my-app\\public\\images\\"+image; 
        const sql ="INSERT INTO users(image) VALUES  (?)";
        db.query(sql, path, (err,result)=>{
            if(err) {
                console.log("ERROR: ",err);
                return res.json({Message:"Error"});
            }

            return res.json({Status:"Success",data: result})
        })
        
    
});

app.get('/',(req,res)=>{
    const sql= 'select * from users';
    db.query(sql,(err,result)=>{
        if(err) return res.json("Error");
        return res.json(result);
    })
})
//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))