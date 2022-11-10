const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//28
const ImageInfoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    linkImage: {
        type: String,
        required: false
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('ImageInfo', ImageInfoSchema);