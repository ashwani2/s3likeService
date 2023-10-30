const express = require('express');
const multer=require('multer')
const {
  listBuckets,
  listObjects,
  getObject,
  putObject,
  deleteObject
} = require('../controllers/s3.controller');
const apiLogger = require('../middlewares/apiLogger'); 

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
});

//apiLogger middleware to log API requests for the following routes
router.use(apiLogger);

router.route("/buckets").get(listBuckets)
router.route("/buckets/:bucketName/objects").post(upload.single('file'),putObject)
router.route("/buckets/:bucketName/objects").get(listObjects)
router.route("/buckets/:bucketName/objects/:objectName").get(getObject).delete(deleteObject)



module.exports = router;