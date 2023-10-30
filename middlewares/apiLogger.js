const ApiLog = require('../models/ApiLog');
const { formatBytes } = require('../utils/general');

module.exports = async (req, res, next) => {
  // Log the start time of the request
  const startTime = new Date();

  // Save the original response.end method to capture the status code
  const originalEnd = res.end;

  // Create a buffer to capture the response data
  const chunks = [];

  // Override the response end method to capture the status code and response data
  res.end = (chunk, encoding) => {
    if (chunk) {
      chunks.push(chunk);
    }

    // Call the original response end method
    originalEnd.call(res, chunk, encoding);

    // Calculate the time taken for the request
    const endTime = new Date();
    const responseTime = endTime - startTime;

    // Extract the relevant information from the request and response
    const { method, url, ip } = req;
    const status = res.statusCode;

    // Calculate payload size
    const payloadSize = Buffer.concat(chunks).length; 
    const formattedPayloadSize = formatBytes(payloadSize)

    const apiLog = new ApiLog({
      time: startTime,
      operation: method,
      location: url,
      IP: ip,
      responseStatusCode: status,
      responseTime:`${responseTime}ms`,
      payloadSize:formattedPayloadSize
    });

    apiLog.save().catch((error) => {
      console.error('Error saving API log:', error);
    });
  };

  next();
};
