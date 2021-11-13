const express=require('express')
const app=express();
const path=require('path');
const multer=require('multer');

/**
* This middleware is use for to enable cores for all incomming API calls
*/
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/**
* This middleware is use for to upload media files
*/
app.use(
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'Images/');
      },
      filename: (req, file, cb) => {
        let fileExt = path.extname(file.originalname);
        let fileName = path.parse(file.originalname).name.replace(/[\s.]/g, '_') + '_' + Date.now().toString().substr(-5) + fileExt;
        cb(null, fileName);
      },
    }),
  }).any()
);

app.set('View Engine','ejs');

app.get("/upload",(req,res)=>{
    res.render("upload");
});

app.post('/upload',(req,res)=>{
    console.log(req.files[0])
    res.send("Image uploaded")
});

const port=3001
app.listen(port,()=>{
    console.log(`${port}`)
});