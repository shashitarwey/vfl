const mongoose = require( 'mongoose' );

require( '../models/User' );
require( '../models/Product' );

const uri = 'mongodb+srv://shashitarwey:Shashi@9122@cluster0.sp6kc.mongodb.net/vfldb?retryWrites=true&w=majority';

mongoose.connect( uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
    })
    .then( () => {
    console.log( 'Connection Successful' )
    })
    .catch( (err) => console.log( err ) );

mongoose.connection.on( 'open', () => {
    console.log( 'connection to DB has been established' );
});

mongoose.connection.on( 'error', ( err ) => {
    console.error( err.message );
});