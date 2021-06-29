const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );

    if( !token ) {
        const error = new Error( 'Go away intruder' );
        error.status = 401;
        return next( error );
    }

    jwt.verify( token, 'abcd', ( err, claims ) => {
        if( err ) {
            const error = new Error( 'Go away intruder' );
            error.status = 401;
            return next( error );
        }

        // all good! we can let this person in...
        // set up claims data for use in middleware called next
        res.locals.claims = claims;
        next();
    });
}

function authorize( role ) {
    return function( req, res, next ) {
        const claims = res.locals.claims;
    
        if( claims.userType !== role ) {
            const error = new Error( 'You are not authorized' );
            error.status = 403;
            return next( error );
        }
        next();
    };
}

module.exports = {
    authenticate,
    authorize
};