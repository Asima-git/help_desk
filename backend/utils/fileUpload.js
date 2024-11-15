// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// function fileFilter(req, file, cb) {
//   const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// module.exports = { upload };
const multer  = require('multer')

//defined file storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace('/:/g','-') + "-" + file.originalname)
    }
  })
  
  //specify file format that can be saved

  function fileFilter (req, file, cb) {
    if(
        file.minetype === 'image/png' || 
        file.minetype === 'image/jgp' || 
        file.minetype === 'image/jpeg'){
            cb(null, false)
        }else{
            cb(null, true);
        }
  cb(new Error('I don\'t have a clue!'))
}

const upload = multer({ storage, fileFilter})

//file size formater 
function fileSizeFormat(bytes, decimals) {
    if (bytes === 0) return '0 Bytes';
  
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(decimals))} ${sizes[i]}`;
  }
module.exports = {upload,fileSizeFormat}