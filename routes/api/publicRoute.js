const express = require('express')
const router = express.Router()
const multer = require('multer')
const randomString = require('randomstring')

//bring modal
const File = require('../../modal/File')

router.get('/', (req, res)=>{
    res.render('index')
})


//get sharable file
router.get('/:vcode', (req, res)=>{

    var fileArray = []
    File.find()
    .then((file)=>{
        
        file.filter( index => {
            if( index.code === req.params.vcode ){
                fileArray.push(index)
            }
        })
        res.render('getfile',{fileArray})

    })
    .catch((error)=>{
        console.log(error)
    })


})

module.exports = router
