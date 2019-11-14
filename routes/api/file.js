const express = require('express')
const router = express.Router()
const multer = require('multer')
const randomString = require('randomstring')

//configure multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './routes/public/file')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

//bring modal
const File = require('../../modal/File')

router.post('/uploadfile',upload.array('uploadfile', 100), (req, res)=>{
    
    const code = randomString.generate(8)
    for( i=0;i<req.files.length;i++ ){
        var newfile = new File({
            originalname : req.files[i].originalname,
            filename : req.files[i].filename,
            code : code,
        })
        newfile.save()
        .then(()=>{
            res.send({success: true, code: code})
            res.setHeader('content-Type','application/json')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

})

module.exports = router
