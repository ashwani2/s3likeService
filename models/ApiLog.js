const mongoose = require("mongoose");

const ApiLogSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  operation: String,
  location: String,
  IP: String,
  responseStatusCode: Number,
  responseTime:String,
  payloadSize:String
});

module.exports = mongoose.model("ApiLog", ApiLogSchema, "ApiLogs");
