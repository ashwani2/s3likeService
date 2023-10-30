# S3 Like Service API's

## Description

This project tries to do the basic apis of s3 like list the bucket,get object and put object

## High-Level Overview

- **Language Used**: JavaScript (Node.js)
- **Framework Used**: Express.js
- **Database**: MongoDB with Mongoose
- **API Style**: RESTful

### How It Works

 Here's a high-level overview of the endpoints and their functionality:

- **GET /api/buckets**: Retrieve a list of buckets.

- **GET /api/buckets/:bucketName/objects**: Retrieve all the objects inside a particular Bucket with their URL.

- **POST /api/buckets/:bucketName/objects**: Upload/put the object inside a bucket 

- **GET /api/buckets/:bucketName/objects/:objectName**: View the object inside a bucket

- **DELETE /api/buckets/:bucketName/objects/:objectName**: Delete an object inside a bucket.

## Trade-Offs

- **Simplicity Over Complexity**: To keep this project manageable certain advanced features such as authentication and authorization have not been implemented.

- **Rate Limiting**: Rate limiting to prevent abuse or overload of the API could be added in production to ensure fair usage.

## Assumptions

- The API assumes that the client will provide valid and complete data when putting or getting an Object. No extensive data validation is implemented in this basic version.

- The Listing APIs don't have pagination implemented as it is a basic version.

- Authentication and authorization are assumed to be handled by an external service in a real-world application.

## Changes for Production

In a production-ready version, several improvements and features should be considered:

- **Security**: Implement authentication, authorization, and input validation to ensure data integrity and user access control.

- **Logging and Monitoring**: Implement comprehensive logging and monitoring for better visibility into the application's performance and issues.

- **Error Handling**: Implement more detailed and user-friendly error responses to aid debugging and troubleshooting.

- **Soft delete**: Implement soft Delete in production for non deletion of documents if any mistake occurs it can be retrieved.

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/ashwani2/s3likeService.git`
2. **Install Dependencies**: `npm install`
3. **Set Up Environment Variables**: Create a `.env` file in config folder
4. **MONGO_URI**: Put your connection String there
5. **NODE_ENV**: development
6. **PORT**: 5000
7. **LOCAL_URL**:http://localhost:5000
8. **Start the Server in devlopment environment**: `npm run dev`


## Spec Compliance and Time Spent

- **Parts of the Spec Completed**: All specified endpoints (GET, POST, DELETE) have been implemented.Logging the API details in the database has been added as an extra feature to get more control over the APIs

- **Time Spent**: The initial implementation took approximately 4 hours, including creating the Express app, setting up the database, and implementing the endpoints.

- **Challenges Encountered**: A challenge was implementing ensuring proper error handling.

---
