let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ImageSchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
    image_name: {
        type: String,
        required: false
    },
    image_type: {
        type: String,
        required: false
    },
    date_created: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    isTrue:{
        type:Boolean,
        required:false
    }
});



let Image = module.exports = mongoose.model('Image', ImageSchema);