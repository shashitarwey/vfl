const express = require( 'express' );

// const { upload } = require('../middlewares/upload')

const {
    getProduct,
    getProductById,
    postProduct,
    updateProduct,
    removeProduct
} = require( '../controllers/products' );

const router = express.Router();

router.use( express.static(__dirname + "./public/") );
const { authenticate, authorize } = require( '../middlewares/auth' );


router.get( '/', authenticate, getProduct );
router.get( '/:id',authenticate, getProductById );
router.post( '/', authorize, authenticate, postProduct );
router.patch('/:id',authorize, authenticate, updateProduct );
router.delete('/:id',authorize, authenticate, removeProduct );


module.exports = router;