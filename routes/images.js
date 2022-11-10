const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');



router.post('/', 
    // imagesController.uploadImage,
    imagesController.addNewPost
)

router.get('/',
    imagesController.getAllPosts
)

router.get('/:id',
    imagesController.getOnePost
)


router.delete('/:id',
    imagesController.deletePost
)

router.put('/:id', 
    imagesController.updatePost
)

module.exports = router;

    



