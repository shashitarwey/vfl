const mongoose = require( 'mongoose' );


const Product = mongoose.model( 'Product' );

const postProduct = ( req, res, next ) => {
    const product = req.body;

    if( !product ) {
        const error = new Error( 'Product deatils not sent in request body' );
        next( error );
        return;
    }

    Product
        .create( product )
        .then( updatedProduct => {
            res.status( 201 ).json( updatedProduct );
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

const getProduct = ( req, res, next ) => {

    Product
        .find()
        .then( products => {
            res.status(201).json( products );
        })
        .catch( err => {
            err.status = 500;
            return next( err );
        });
};

const getProductById = ( req, res, next ) => {
    const id = req.params.id;

    Product
        .findById( id )
        .then( product => res.json( product ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const updateProduct = ( req, res, next ) => {
    const id = req.params.id;
    const patchProductDetails = req.body;

    Product
        .findByIdAndUpdate( id, patchProductDetails, { runValidators: true } )
        .then( updatedProduct => res.json( updatedProduct ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const removeProduct = ( req, res, next ) => {
    const id = req.params.id;

    Product
        .findByIdAndRemove( id )
        .then( () => res.status( 204 ).send() )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

module.exports = {
    getProduct,
    getProductById,
    postProduct,
    updateProduct,
    removeProduct
};