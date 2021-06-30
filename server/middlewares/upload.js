// const multer = require( 'multer' );

// var Storage = multer.diskStorage( {
//     destination: './public/images/upload_images/',
//     filename: ( req, file, cb ) => {
//         cb( null, file.filename +"_"+Date.now()+path.extname(file.originalname))
//     }
// });

// var upload = multer({
//     storage:Storage
// }).single('file');

// module.exports = {
//     upload
// };