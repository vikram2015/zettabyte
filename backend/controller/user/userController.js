let Promise = require('promise');
let UserOperation = require('../../database/operation/user/userOperation');

let saveNewUser = (parameter) => {
    return new Promise((resolve, reject) => {
        if (parameter) {
            UserOperation.saveNewUserOperation(parameter).then((user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(false);
                }
            })
        } else {
            resolve(false);
        }
    })

}


let getSelectedUser = (userId) => {
    return new Promise((resolve, reject) => {
        if (userId) {
            UserOperation.getSelectedUserOperation(userId).then((user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(false);
                }
            })
        } else {
            resolve(false);
        }
    })
}


let getAllUserDetails = () => {
    return new Promise((resolve, reject) => {
        UserOperation.getAllUserOperation().then((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        })
    })
}


let updateUserDetails = (id, parameter) => {
    return new Promise((resolve, reject) => {
        UserOperation.updateUserOperation(id, parameter).then((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        })

    })
}


let deleteUserDetails = (id, parameter) => {
    return new Promise((resolve, reject) => {
        UserOperation.deleteUserOperation(id, parameter).then((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        })

    })
}



module.exports = {
    saveNewUser: saveNewUser,
    getSelectedUser: getSelectedUser,
    getAllUserDetails: getAllUserDetails,
    updateUserDetails: updateUserDetails,
    deleteUserDetails:deleteUserDetails,
}