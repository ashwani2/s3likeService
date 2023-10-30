const fs = require("fs").promises;

// Function to get Url for Objects in bucket
const getObjectUrl = (req, bucketName, data) => {
  if (process.env.NODE_ENV === "production") {
    // Use HTTPS in production environment
    return `https://${req.hostname}:${process.env.PORT}/api/buckets/${bucketName}/objects/${data}`;
  } else {
    // Use HTTP in local environment
    return `http://${req.hostname}:${process.env.PORT}/api/buckets/${bucketName}/objects/${data}`;
  }
};

// Function to create directories
const createDirectories = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

// Function to format data into Bytes,KB,MB,GB,TB
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

module.exports = {
  getObjectUrl,
  createDirectories,
  formatBytes,
};
