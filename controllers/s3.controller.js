const fs = require("fs").promises; 
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const { getObjectUrl,createDirectories } = require("../utils/general");


// assumed the bucket names as there is no mentioned API to add buckets
let defaultBuckets = ["Bucket1", "Bucket2"];


// Define the storage directory for objects
const objectStorage = "./objects";

// @desc      List buckets
// @route     GET /api/buckets
// @access    Public
exports.listBuckets = asyncHandler(async (req, res, next) => {
  // Read the list of directories in your object storage directory
  const items = await fs.readdir(objectStorage);
  // Filter out directories from the list
  const bucketPromises = items.map(async (item) => {
    const itemPath = path.join(objectStorage, item);
    const stats = await fs.stat(itemPath);
    if (stats.isDirectory()) {
      return false;
    }
  });

  // Wait for all promises to resolve and filter out directories
  let buckets = (await Promise.all(bucketPromises)).filter(Boolean);

  // if no buckets are there then default buckets should be shown
  if (!buckets.length) {
    buckets = defaultBuckets;
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: buckets,
  });
});

// @desc      Add Object in a Bucket
// @route     POST /api/buckets/:bucketName/objects
// @access    Public
exports.putObject = asyncHandler(async (req, res, next) => {
  const bucketName = req.params.bucketName;
  const objectName = req.file.originalname;
  const bucketPath = path.join(objectStorage, bucketName);
  const objectPath = path.join(bucketPath, objectName);

  // Create the directory if it doesn't exist
  await createDirectories(bucketPath);

  await fs.writeFile(objectPath, req.file.buffer);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Object uploaded successfully",
    data: [],
  });
});

// @desc      List objects in a bucket
// @route     GET /api/buckets/:bucketName/objects
// @access    Public
exports.listObjects = asyncHandler(async (req, res, next) => {
  const bucketName = req.params.bucketName;
  const bucketPath = `${objectStorage}/${bucketName}`;

  let objects = await fs.readdir(bucketPath);

  if (!objects || !objects.length) {
    return next(new ErrorResponse("No Objects Found", 400));
  } else if (objects.length) {
    objects = objects.map((data) => {
      let obj = {
        fileName: data,
        url: getObjectUrl(req, bucketName, data),
      };
      return obj;
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Objects Found!",
    data: objects,
  });
});

// @desc      Get Object from a bucket
// @route     PUT /api/buckets/:bucketName/objects/:objectName
// @access    Public
exports.getObject = asyncHandler(async (req, res, next) => {
  const bucketName = req.params.bucketName;
  const objectName = req.params.objectName;
  const objectPath = path.join(objectStorage, bucketName, objectName);

  const stats = await fs.stat(objectPath);
  if (!stats.isFile()) {
    return next(new ErrorResponse("No File Found!", 400));
  }

  res.status(200).sendFile(objectPath, { root: path.join(__dirname, "..") });
});

// @desc      Delete Object from a bucket
// @route     DELETE /api/buckets/:bucketName/objects/:objectName
// @access    Public
exports.deleteObject = asyncHandler(async (req, res, next) => {
  const bucketName = req.params.bucketName;
  const objectName = req.params.objectName;
  const objectPath = path.join(objectStorage, bucketName);

  await fs.unlink(objectPath);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Object deleted successfully",
    data: [],
  });
});
