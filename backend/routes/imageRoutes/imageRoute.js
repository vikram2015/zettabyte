let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let multer = require('multer');
var path = require('path')
// var nStatic = require('node-static');
// var path = require('../../../public/uploads/')
let NewImageController = require('../../controller/imageController/imageController');


// var fileServer = new nStatic.Server('../../../public/uploads/');
//storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname)
    }
});

//init the upload variable
var upload = multer({
    storage: storage
}).single('file');



router.get('/getTotalImage', (req, res) => {
    NewImageController.getTotalImages().then(function (image) {
        if (image) {
            res.send({ success: true, MSG: 'Image Found Successfully', Image: image });
        } else {
            res.send({ success: false, MSG: 'Error In Finding Image' });
        }
    })
})


router.get('/getSelectedImage', (req, res) => {

    let imageName = req.query.imageName;
    NewImageController.getSelectedImage(imageName).then(function (data) {
        if (data) {
            res.send({ success: true, MSG: 'Selected Image Found Successfully', data: data });
        } else {
            res.send({ success: false, MSG: 'Error In Selected Image Found', data: data });
        }
    });
});

router.post('/download', (req, res, next) => {

    filePath = path.join(__dirname + '../../../uploads') + '/' + req.body.filename;
    res.sendfile(filePath);
});

/**
 * This is the route for storing the image in the database
 */
router.post('/saveNewImage', (req, res, next) => {

    console.log('//////////')
    console.log(req.body)

    upload(req, res, function (err) {
        console.log("??????????")
        console.log(req.file)
        console.log(typeof (req.file.originalname))
        if (err) {
            res.status(501).json({ error: err });
        }
        let parameter = {
            image_name: req.file.originalname,
            image_type: req.file.mimetype,
            date_created: new Date(),
            image_meta_data: req.file,
            image_path: req.file.path,
            isTrue: true
        }
        NewImageController.saveNewImageData(parameter).then(function (data) {
            console.log(data);
        })
        res.json({ originalname: req.file.originalname, uploadName: req.file.filename });
    })
});




router.post('/updateImage', (req, res) => {

    let id = req.body._id ? mongoose.Types.ObjectId(req.body._id) : undefined;
    let image_name = req.body.image_name;
    let image_type = req.body.image_type;
    let date_created;
    if (req.body.date_created || req.body.date_created != null || req.body.date_created != undefined) {
        date_created = req.body.date_created;
    } else {
        date_created = new Date();
    }

    let image = req.body.image;

    let parameter = {
        image_name: image_name,
        image: image,
        date_created: date_created,
        image_type: image_type,
        isTrue: true
    }

    NewImageController.updateImageDetails(id, parameter).then(function (data) {
        if (data) {
            res.send({ success: true, MSG: 'Image Updated Successfully', data: data });
        } else {
            res.send({ success: false, MSG: 'Error In Updating Image', data: data });
        }
    })
})

router.post('/deleteImage', (req, res) => {

    let id = req.body._id ? mongoose.Types.ObjectId(req.body._id) : undefined;
    if (id) {
        let parameter = {
            isTrue: false
        }
        NewImageController.deleteImageDetails(id, parameter).then(function (data) {
            if (data) {
                res.send({ success: true, MSG: 'Image Deleted Successfully', data: data });
            } else {
                res.send({ success: false, MSG: 'Error In Deleting Image' });
            }
        })
    }
})


module.exports = router;

