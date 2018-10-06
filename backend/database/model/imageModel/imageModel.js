let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ImageSchema = new Schema({
    
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
    image_meta_data: {
        type: Object,
        required: true
    },
    image_path:{
        type:String,
        required:true
    },
    isTrue:{
        type:Boolean,
        required:false
    }
});



let Image = module.exports = mongoose.model('Image', ImageSchema);