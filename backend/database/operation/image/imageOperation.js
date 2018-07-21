let mongoose = require('mongoose');
let Promise = require('promise');
let ImageModel = require('../../model/imageModel/imageModel');


let saveNewImageOperation = (parameter) => {
    return new Promise((resolve, reject) => {
        if (parameter) {
            let imageModel = new ImageModel(parameter);
            imageModel.save()
                .then((image) => {
                    if (image) {
                        resolve(image);
                    } else {
                        resolve(false);
                    }
                })
        } else {
            resolve(false);
        }
    })
}


let getSelectedImageOperation = (imageName) => {
    return new Promise((resolve, reject) => {
        if (imageName) {
            ImageModel.findOne({ image_name: imageName, isTrue: true })
                .exec()
                .then((image) => {
                    if (image) {
                        resolve(image);
                    } else {
                        resolve(false);
                    }
                })
        } else {
            resolve(false);
        }
    })
};



let getAllImageOperation = () => {
    return new Promise((resolve, reject) => {
        ImageModel.find({ isTrue: true })
            .exec()
            .then((image) => {
                if (image && image.length > 0) {
                    resolve(image);
                } else {
                    resolve(false);
                }
            })
    })
};

let updateImageOperation = (id, parameter) => {
    return new Promise((resolve, reject) => {
        ImageModel.findByIdAndUpdate(id, { $set: parameter })
            .exec()
            .then((image) => {
                ImageModel.find({ _id: image._id })
                    .then(function (currentImage) {
                        if (currentImage) {
                            resolve(currentImage);
                        } else {
                            resolve(false);
                        }
                    })
            })
            .catch(function (err) {
                resolve(false)
            })
    })
};


let deleteImageOperation = (id, parameter) => {
    return new Promise((resolve, reject) => {
        ImageModel.findByIdAndUpdate(id, { $set: { isTrue: parameter.isTrue } })
            .exec()
            .then((image) => {
                ImageModel.findOne({ _id: image._id })
                    .then(function (currentImage) {
                        if (currentImage.isTrue == false) {
                            resolve(currentImage);
                        } else {
                            resolve(false);
                        }
                    })
            })
            .catch(function (err) {
                resolve(false)
            })
    })
};



module.exports = {
    saveNewImageOperation: saveNewImageOperation,
    getAllImageOperation: getAllImageOperation,
    getSelectedImageOperation: getSelectedImageOperation,
    updateImageOperation: updateImageOperation,
    deleteImageOperation: deleteImageOperation,
}