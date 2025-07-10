# FailWall API

A simple social media API built with Node.js, Express.js, and MongoDB that supports posts, comments, reactions, and basic CRUD operations.

## Features

- Create and delete posts
- Add reactions to posts (like, love, laugh, angry, sad)
- Add, edit, and delete comments
- Get all posts (failwall posts)
- Get specific post by ID

## Project Structure

```
social-media-api/
├── middleware/
│   ├── errorHandler.js     # Error handling middleware
│   └── validation.js       # Input validation middleware
├── models/
│   └── Post.js            # Post model/schema
├── routes/
│   ├── posts.js           # Posts route handlers
│   └── health.js          # Health check route
├── server.js              # Main application file
├── package.json
├── .env
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Postman (for API testing)

## Installation

1. Clone the repository or create a new project directory
2. Create the folder structure:
   ```bash
   mkdir middleware models routes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/socialapi
   PORT=3000
   ```

5. Start MongoDB service on your local machine

6. Run the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Architecture

### Middleware Layer
- **validation.js**: Input validation for posts, comments, and reactions
- **errorHandler.js**: Global error handling and 404 responses

### Models Layer
- **Post.js**: MongoDB schema for posts with embedded comments and reactions

### Routes Layer
- **posts.js**: All post-related endpoints (CRUD operations)
- **health.js**: Health check endpoint

### Benefits of This Structure
- **Separation of Concerns**: Each layer has a specific responsibility
- **Maintainability**: Easy to modify individual components
- **Scalability**: Simple to add new features and routes
- **Reusability**: Middleware can be shared across routes
- **Testing**: Each component can be tested independently

## API Endpoints

### Base URL: `http://localhost:3000/api`

### 1. Create Post
- **POST** `/posts`
- **Body:**
  ```json
  {
    "content": "This is my first post!",
    "author": "John Doe"
  }
  ```

### 2. Delete Post
- **DELETE** `/posts/:id`
- **Example:** `DELETE /posts/64f8b1234567890abcdef123`

### 3. Add Reaction to Post
- **POST** `/posts/:id/reactions`
- **Body:**
  ```json
  {
    "type": "like",
    "user": "John Doe"
  }
  ```
- **Reaction types:** `like`, `love`, `laugh`, `angry`, `sad`

### 4. Add Comment to Post
- **POST** `/posts/:id/comments`
- **Body:**
  ```json
  {
    "content": "Great post!",
    "author": "Jane Smith"
  }
  ```

### 5. Delete Comment
- **DELETE** `/posts/:postId/comments/:commentId`

### 6. Edit Comment
- **PUT** `/posts/:postId/comments/:commentId`
- **Body:**
  ```json
  {
    "content": "Updated comment content"
  }
  ```

### 7. Get All Posts (Failwall Posts)
- **GET** `/posts`

### 8. Get Post by ID
- **GET** `/posts/:id`

### 9. Health Check
- **GET** `/health`

## Postman Testing

### Setup Collection

1. Create a new collection in Postman called "Social Media API"
2. Set base URL as environment variable: `http://localhost:3000/api`

### Test Scenarios

#### 1. Create a Post
```
POST {{base_url}}/posts
Content-Type: application/json

{
  "content": "Hello World! This is my first post.",
  "author": "Alice Johnson"
}
```

#### 2. Get All Posts
```
GET {{base_url}}/posts
```

#### 3. Add Reaction
```
POST {{base_url}}/posts/[POST_ID]/reactions
Content-Type: application/json

{
  "type": "like",
  "user": "Bob Wilson"
}
```

#### 4. Add Comment
```
POST {{base_url}}/posts/[POST_ID]/comments
Content-Type: application/json

{
  "content": "Nice post!",
  "author": "Charlie Brown"
}
```

#### 5. Edit Comment
```
PUT {{base_url}}/posts/[POST_ID]/comments/[COMMENT_ID]
Content-Type: application/json

{
  "content": "Updated: Really nice post!"
}
```

#### 6. Delete Comment
```
DELETE {{base_url}}/posts/[POST_ID]/comments/[COMMENT_ID]
```

#### 7. Get Specific Post
```
GET {{base_url}}/posts/[POST_ID]
```

#### 8. Delete Post
```
DELETE {{base_url}}/posts/[POST_ID]
```

## Data Structure

### Post Schema
```javascript
{
  _id: ObjectId,
  content: String (required),
  author: String (required),
  reactions: [{
    type: String (like, love, laugh, angry, sad),
    user: String
  }],
  comments: [{
    _id: ObjectId,
    content: String,
    author: String,
    createdAt: Date,
    editedAt: Date
  }],
  createdAt: Date
}
```

## Error Handling

The API includes proper error handling with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Features Implemented

✅ Create Post  
✅ Delete Post  
✅ Add reactions/custom comments  
✅ Delete comment/reply (with edit allowance once)  
✅ Edit comment/reply (with edit allowance once)  
✅ Get all failwall posts  
✅ Get failwall post by ID  

## Notes

- Comments can be edited once (tracked via `editedAt` field)
- Reactions are unique per user (updating reaction replaces previous one)
- Posts are sorted by creation date (newest first)
- All fields are validated for required data

## Development

To extend this API:

1. Add authentication middleware
2. Implement user management
3. Add image upload support
4. Implement real-time features with Socket.io
5. Add pagination for posts
6. Implement nested replies for comments

## License

MIT License