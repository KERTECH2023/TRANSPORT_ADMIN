const express = require('express')
const  router = express.Router()


const ChauffContro  = require('../Controllers/ChauffContro')


const UploadImage = require ("../services/upload");


const multer = require('multer')

const Multer = multer({
  storage:multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // No larger than 10mb
    fieldSize: 10 * 1024 * 1024, // No larger than 10mb
}
})

const upload = multer({ storage:multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // No larger than 10mb
    fieldSize: 10 * 1024 * 1024, // No larger than 10mb
}}); // Specify the destination folder for uploaded files

router.put('/updatechauf/:id', upload.single("photoAvatar"), ChauffContro.update);








router.delete('/destroychauff/:id', ChauffContro.destroy);
 


// Use Multer middleware for file upload
router.post('/AjoutChauf',Multer.fields([
  { name: "photoAvatar", maxCount: 1 },
  { name: "photoPermisRec", maxCount: 1 },
  { name: "photoPermisVer", maxCount: 1 },
  { name: "photoVtc", maxCount: 1 },
  { name: "photoCin", maxCount: 1 },
]), UploadImage,  ChauffContro.register
);
//router.put('/updatechauf/:id',Multer.single('photoAvatar'),UploadImage,ChauffContro.update)


router.post('/loginch',ChauffContro.login)
router.put('/pass/:id',ChauffContro.UpPass)
router.get('/loginch',ChauffContro.login)


router.get('/searchchauf/:id', ChauffContro.searchuse);

//router.get('/getAg', AuthController.recupereruse);
 //router.put('/updatechauf/:id',Multer.single("photoAvatar"),UploadImage, ChauffContro.update);
router.put('/updatestatus/:id', ChauffContro.updatestatus);
router.put('/updatestatuss/:id', ChauffContro.updatestatuss);
router.post('/reset', ChauffContro.resetPassword);




module.exports = router