const mongoose = require( 'mongoose' );

require( '../models/User' );
require( '../models/Product' );

const uri = 'mongodb://localhost:27017/vflDB';

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );
mongoose.set( 'useCreateIndex', true);

mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on( 'open', () => {
    console.log( 'connection to DB has been established' );
});

mongoose.connection.on( 'error', ( err ) => {
    console.error( err.message );
});