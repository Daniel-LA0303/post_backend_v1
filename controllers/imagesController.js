const ImageInfo = require('../models/ImageInfo');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');



//primero se sube el archivo 
// const configuracionMulter = {
//     storage: fileStorage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, __dirname+'../../uploads/');
//         },
//         filename: (req, file, cb) => {
//             const extension = file.mimetype.split('/')[1];
//             cb(null, `${shortid.generate()}.${extension}`);
//         }
//     }),
// }

// //add image
// const upload = multer(configuracionMulter).single('imagen');
// exports.uploadImage = async (req, res, next) => {
//     upload(req, res, function(error) {
//         if(error){
//             res.json({mensaje: error})
//         }
//         return next()
//     }) 
// }

//add information
exports.addNewPost = async (req, res, next) => {
    const post = new ImageInfo(req.body);

    try {
        // if(req.file.filename){
        //     post.linkImage = req.file.filename
        // }
        await post.save();
        res.json({mensaje: 'Se agrego un nuevo post'});
    } catch (error) {   
        console.log(error);
        next();
    }
}


//get all posts
exports.getAllPosts = async (req, res, next) =>{
    try {
        const post = await ImageInfo.find({})
        res.json(post);
    } catch (error) {
        console.log(error);
        next();
    }
}

//get one post
exports.getOnePost = async (req, res, next) =>{

    try {
        const post = await ImageInfo.findById(req.params.id);
        res.json(post);
        
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ese Cliente no existe'});
        next();
    }

}

//update a post
exports.updatePost = async(req, res, next) => {

    console.log(req.params);
    console.log(req.body);
    
    let post = req.body;
    try {
        if(req.body.previousName){
            fs.unlinkSync(__dirname+`/../uploads/${req.body.previousName}`);
            console.log('archivo eliminado');
        }
        let post = await ImageInfo.findByIdAndUpdate(
            {_id: req.params.id},{
                title: req.body.title,
                desc: req.body.desc,
                linkImage: req.body.linkImage
            },
            {new: true}
        )
        res.json({mensaje: 'Se agrego un nuevo post'});
    } catch (error) {
        console.log(error);
    }

    // console.log(req.bod);
    
}

//delete a post
exports.deletePost = async (req, res, next) =>{
    
    //search info about
    const post = await ImageInfo.findById(req.params.id)
    //first delete the image
    if(post.linkImage !== ''){
        try {
            fs.unlinkSync(__dirname+`/../uploads/${post.linkImage}`);
            console.log('archivo eliminado');
        } catch (error) {
            console.log(error);
        }
    }

    //delete info from db
    try {
        await ImageInfo.findByIdAndDelete({_id: req.params.id});

        res.json({mensaje: 'El producto se ha eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}

