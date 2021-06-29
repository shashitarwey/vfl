// Connection to Database
require( './data/init' );

const express = require( 'express' );
const cors = require( 'cors' );

const authRouter = require( './routes/auth' );
const productRouter = require( './routes/product' );
const app = express();



app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( '/auth', authRouter );
app.use( '/product', productRouter );


const PORT = process.env.PORT || 3000;

app.listen( PORT, err => {
    if( err ) {
        console.error( err.message )
    }
    console.log( `server is running at ${PORT}` )
})
