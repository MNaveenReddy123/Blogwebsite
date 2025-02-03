# BlogWebsite

## Overview
BlogWebsite is a full-stack blogging platform that allows users to register, log in, create, edit, and delete blog posts. It features authentication, user sessions, and flash messages for user feedback.

## Features
- User authentication (Register, Login, Logout)
- Flash messages for feedback
- CRUD operations for blog posts
- Middleware to restrict access
- Responsive UI using EJS templates
- MongoDB for database storage

## Technologies Used
- Backend: Node.js, Express.js
- Frontend: EJS, Bootstrap, CSS
- Database: MongoDB (Mongoose ODM)
- Authentication: Passport.js (Local Strategy)
- Session Management: express-session
- Flash Messages: connect-flash

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MNaveenReddy123/BlogWebsite.git
   cd BlogWebsite
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```sh
   npm start
   ```

## License
This project is licensed under the MIT License.

---



