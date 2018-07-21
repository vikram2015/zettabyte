let mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_adress: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: Number }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isTrue:{
        type:Boolean,
        required:true
    }
});


//Method for hashing the password
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});



//Method for comparing the password type with password in database
UserSchema.methods.validPassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

let User = module.exports = mongoose.model('User', UserSchema);