# Backend Integration Documentation

## Overview
The admin dashboard has been successfully integrated with a Node.js/Express backend featuring MongoDB and Cloudinary for file uploads.

## Backend Features
- **Authentication**: JWT-based admin authentication
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for image uploads
- **Security**: Rate limiting, CORS, helmet security headers
- **Validation**: Comprehensive data validation and sanitization

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial (requires auth)
- `PUT /api/testimonials/:id` - Update testimonial (requires auth)
- `DELETE /api/testimonials/:id` - Delete testimonial (requires auth)

### Team Members
- `GET /api/team` - Get all team members
- `POST /api/team` - Create new team member (requires auth)
- `PUT /api/team/:id` - Update team member (requires auth)
- `DELETE /api/team/:id` - Delete team member (requires auth)

### File Upload
- `POST /api/upload/image` - Upload image to Cloudinary (requires auth)

## Database Models

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- role: String (enum: 'admin', 'user')

### Project
- title: String (required)
- description: String (required)
- tech: [String] (required)
- image: String
- link: String (required)
- featured: Boolean (default: false)

### Testimonial
- quote: String (required)
- author: String (required)
- role: String (required)
- company: String (required)
- rating: Number (1-5, default: 5)

### TeamMember
- name: String (required)
- role: String (required)
- email: String (required, unique)
- location: String (required)
- joinedYear: String (required)
- bio: String (required)
- socialLinks: Object (linkedin, twitter, github)

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Seed the database with initial data:
   ```bash
   node seed.js
   ```

5. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Configure environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Admin Login Credentials
- **Email**: admin@weanovas.co.in
- **Password**: admin123

## Frontend Integration Features

### Authentication System
- Custom React hooks for authentication state management
- Protected routes with automatic redirection
- JWT token storage in localStorage
- Logout functionality

### Data Management
- Custom hooks for API data fetching and management
- Real-time data updates after CRUD operations
- Loading states and error handling
- Optimistic UI updates

### Forms Integration
- Dynamic forms for creating and editing content
- File upload support for project images
- Form validation and error display
- Proper TypeScript integration

### UI Components
- Loading spinners during API calls
- Error states and messaging
- Responsive design for all screen sizes
- Modern dashboard interface with sidebar navigation

## API Client Features
- Centralized API communication
- Automatic JWT token handling
- Error handling and response processing
- TypeScript interfaces for type safety
- File upload support

## Security Features
- JWT authentication and authorization
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Password hashing with bcrypt
- Secure cookie handling

## Development Notes
- Backend runs on port 5000
- Frontend runs on port 3001 (or 3000 if available)
- ESLint configured for both CommonJS (backend) and ES modules (frontend)
- MongoDB connection with error handling
- Cloudinary integration for scalable image storage

## Testing the Integration
1. Start both backend and frontend servers
2. Navigate to http://localhost:3001/admin/login
3. Login with the provided credentials
4. Test CRUD operations for projects, testimonials, and team members
5. Verify file upload functionality
6. Test authentication flow and logout

The integration is now complete and fully functional!
