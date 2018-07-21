let Promise = require('promise');
let ImageOperation = require('../../database/operation/image/imageOperation');

let saveNewImageData = (parameter) => {
    return new Promise((resolve, reject) => {
        if (parameter) {
            ImageOperation.saveNewImageOperation(parameter).then((image) => {
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


let getSelectedImage = (imageName) => {
    return new Promise((resolve, reject) => {
        if (imageName) {
            ImageOperation.getSelectedImageOperation(imageName).then((image) => {
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


let getTotalImages = () => {
    return new Promise((resolve, reject) => {
        ImageOperation.getAllImageOperation().then((image) => {
            if (image) {
                resolve(image);
            } else {
                resolve(false);
            }
        })
    })
}


let updateImageDetails = (id, parameter) => {
    return new Promise((resolve, reject) => {
        ImageOperation.updateImageOperation(id, parameter).then((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        })
    })
}


let deleteImageDetails = (id, parameter) => {
    return new Promise((resolve, reject) => {
        ImageOperation.deleteImageOperation(id, parameter).then((image) => {
            if (image) {
                resolve(image);
            } else {
                resolve(false);
            }
        })
    })
}



module.exports = {
    saveNewImageData: saveNewImageData,
    getTotalImages: getTotalImages,
    getSelectedImage: getSelectedImage,
    updateImageDetails: updateImageDetails,
    deleteImageDetails: deleteImageDetails
}