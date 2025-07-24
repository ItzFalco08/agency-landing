# Annovas Agency Backend API

A comprehensive backend API built with Node.js, Express, MongoDB, and Cloudinary for the Annovas Agency admin dashboard.

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 📁 **File Upload** - Image upload to Cloudinary for projects, testimonials, and team members
- 🗃️ **MongoDB Database** - Robust data storage with Mongoose ODM
- 🛡️ **Security** - Helmet, rate limiting, input validation, and CORS protection
- 📋 **CRUD Operations** - Complete management of projects, testimonials, and team members
- 🎯 **Role-based Access** - Admin and moderator roles with appropriate permissions
- 📱 **RESTful API** - Clean and organized API endpoints
- ✅ **Data Validation** - Input validation with express-validator
- 📄 **Error Handling** - Comprehensive error handling and logging

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image uploads

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   copy .env.example .env
   ```
   
   Edit the `.env` file with your actual configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/annovas-agency
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   
   # Admin Credentials
   ADMIN_EMAIL=admin@weanovas.co.in
   ADMIN_PASSWORD=admin123
   
   # CORS
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. **Seed the database (optional):**
   ```bash
   node seedDb.js
   ```
   This creates an admin user and sample data for testing.

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000/api`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/change-password` - Change password

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get project by ID (public)
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `PUT /api/projects/:id/toggle-featured` - Toggle featured status (admin)
- `PUT /api/projects/reorder` - Reorder projects (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (public)
- `GET /api/testimonials/:id` - Get testimonial by ID (public)
- `POST /api/testimonials` - Create new testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)
- `PUT /api/testimonials/:id/toggle-featured` - Toggle featured status (admin)
- `PUT /api/testimonials/reorder` - Reorder testimonials (admin)

### Team Members
- `GET /api/team` - Get all team members (public)
- `GET /api/team/:id` - Get team member by ID (public)
- `POST /api/team` - Create new team member (admin)
- `PUT /api/team/:id` - Update team member (admin)
- `DELETE /api/team/:id` - Delete team member (admin)
- `PUT /api/team/reorder` - Reorder team members (admin)

### File Upload
- `POST /api/upload/project-image` - Upload project image (admin)
- `POST /api/upload/testimonial-avatar` - Upload testimonial avatar (admin)
- `POST /api/upload/team-avatar` - Upload team member avatar (admin)
- `POST /api/upload/user-avatar` - Upload user avatar (authenticated)
- `POST /api/upload/multiple` - Upload multiple images (admin)
- `DELETE /api/upload/:publicId` - Delete image from Cloudinary (admin)

### Health Check
- `GET /api/health` - API health check

## Database Models

### User
- Email, password (hashed)
- Name, role (admin/moderator)
- Avatar, active status
- Last login timestamp

### Project
- Title, description, technologies
- Image (Cloudinary URL and public ID)
- Project link, featured status
- Status (active/inactive), order

### Testimonial
- Quote, author information
- Role, company, rating
- Avatar (Cloudinary URL and public ID)
- Featured status, order

### Team Member
- Personal information (name, email, location)
- Role, bio, joined year
- Avatar, social links
- Skills array, status, order

## Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent abuse
- **CORS Protection** with configurable origins
- **Input Validation** with express-validator
- **Helmet** for security headers
- **Error Handling** without exposing sensitive data

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)
- `node seedDb.js` - Seed database with sample data

### File Structure

```
backend/
├── config/
│   └── cloudinary.js      # Cloudinary configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Project.js         # Project model
│   ├── Testimonial.js     # Testimonial model
│   └── TeamMember.js      # Team member model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── projects.js        # Project routes
│   ├── testimonials.js    # Testimonial routes
│   ├── team.js            # Team member routes
│   └── upload.js          # File upload routes
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
├── seedDb.js              # Database seeder
├── server.js              # Main server file
└── README.md              # This file
```

## Environment Setup

### MongoDB

**Local MongoDB:**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Cloudinary

1. Create account at https://cloudinary.com
2. Get your cloud name, API key, and API secret from dashboard
3. Update Cloudinary config in .env

## Production Deployment

1. **Set environment variables** for production
2. **Use a process manager** like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "annovas-api"
   ```
3. **Set up reverse proxy** with Nginx
4. **Enable SSL/TLS** with Let's Encrypt
5. **Configure monitoring** and logging

## API Usage Examples

### Authentication
```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@weanovas.co.in',
    password: 'admin123'
  })
});

const { token, user } = await response.json();
```

### Creating a Project
```javascript
// Create project with image upload
const formData = new FormData();
formData.append('title', 'My Project');
formData.append('description', 'Project description');
formData.append('tech', JSON.stringify(['React', 'Node.js']));
formData.append('link', 'https://example.com');
formData.append('image', imageFile);

const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

## Support

For support or questions, please contact:
- Email: support@weanovas.co.in
- Website: https://weanovas.co.in

## License

This project is licensed under the MIT License.
