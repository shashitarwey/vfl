// Connection to Database
require( './data/init' );

const express = require( 'express' );
const cors = require( 'cors' );
// const multer = require( 'multer' );
// const path = require( 'path' );
// const fileUpload = require( 'express-fileupload' );
// const bodyParser = require( 'body-parser' );


const authRouter = require( './routes/auth' );
const productRouter = require( './routes/product' );
const app = express();


// all environment

// app.set('views',__dirname + '/views');
// app.set( 'view engine', 'ejs' );
app.use( cors() );
app.use( express.json() );
// app.use( express.urlencoded( { extended: false } ) );
// app.use( bodyParser.urlencoded( { extended: false } ) );
// app.use( bodyParser.json());
// app.use(express.static( path.join(__dirname,'public') ) );
// app.use( fileUpload() );
app.use( '/auth', authRouter );
app.use( '/product', productRouter );


const PORT = process.env.PORT || 3000;

if( process.env.NODE_ENV === "production") {
    app.use( express.static( "vfl/dist" ) );
}

app.listen( PORT, err => {
    if( err ) {
        console.error( err.message )
    }
    console.log( `server is running at ${PORT}` )
})
