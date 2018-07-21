let mongoose = require('mongoose');
let Promise = require('promise');
let UserModel = require('../../model/user/userModel');


let saveNewUserOperation = (parameter) => {
    return new Promise((resolve, reject) => {
        if (parameter) {
            let userModel = new UserModel(parameter);
            userModel.save()
                .then((user) => {
                    if (user) {
                        let newUser = {
                            _id: user._id,
                            userName: user.user_name,
                            userAdress: user.user_adress,
                            email: user.email,
                        }
                        resolve(newUser);
                    } else {
                        resolve(false);
                    }
                })
        } else {
            resolve(false);
        }
    })

}

let getSelectedUserOperation = (userId) => {
    return new Promise((resolve, reject) => {
        if (userId) {
            UserModel.findById(userId)
                .exec()
                .then((user) => {
                    if (user) {
                        let newUser = {
                            _id: user._id,
                            userName: user.user_name,
                            userAdress: user.user_adress,
                            userId: user.user_id,
                        }
                        resolve(newUser);
                    } else {
                        resolve(false);
                    }
                })
        } else {
            resolve(false);
        }
    })
};



let getAllUserOperation = () => {
    let newUser = {};
    let UserFullDetails = [];
    return new Promise((resolve, reject) => {
        UserModel.find({ isTrue: true })
            .exec()
            .then((user) => {
                if (user && user.length > 0) {
                    for (let i = 0; i < user.length; i++) {
                        newUser = {
                            _id: user[i]._id,
                            userName: user[i].user_name,
                            userAdress: user[i].user_adress,
                            email: user[i].email,
                        }
                        UserFullDetails.push(newUser);
                        newUser = {};
                    }
                    resolve(UserFullDetails);
                } else {
                    resolve(false);
                }
            })

    })
};

let updateUserOperation = (id, parameter) => {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, { $set: parameter })
            .exec()
            .then((user) => {
                UserModel.find({ _id: user._id })
                    .then(function (currentUser) {
                        if (currentUser) {
                            let newUser = {
                                _id: currentUser[0]._id,
                                userName: currentUser[0].user_name,
                                userAdress: currentUser[0].user_adress,
                                email: currentUser[0].email,
                            }
                            resolve(newUser);
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


let deleteUserOperation = (id, parameter) => {

    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, { $set: { isTrue: parameter.isTrue } })
            .exec()
            .then((user) => {
                UserModel.findOne({ _id: user._id })
                    .then(function (currentUser) {
                        if (currentUser.isTrue == false) {
                            let newUser = {
                                _id: currentUser._id,
                                userName: currentUser.user_name,
                                userAdress: currentUser.user_adress,
                                email: currentUser.email,
                            }
                            resolve(newUser);
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
    saveNewUserOperation: saveNewUserOperation,
    getSelectedUserOperation: getSelectedUserOperation,
    getAllUserOperation: getAllUserOperation,
    updateUserOperation: updateUserOperation,
    deleteUserOperation: deleteUserOperation,
}