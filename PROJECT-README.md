# Annovas Agency - Full Stack Application

A modern agency website with an admin dashboard built with Next.js frontend and Node.js backend.

## 🏗️ Project Structure

```
annovas-agency/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utilities and configurations
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── config/              # Configuration files
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   └── package.json
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image uploads

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd annovas-agency

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

#### Backend Environment (.env)
Create `backend/.env` with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/agency-landing?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
JWT_EXPIRE=7d

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@weanovas.co.in
ADMIN_PASSWORD=admin123
```

#### Frontend Environment (.env.local)
Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Get connection string and update `MONGODB_URI` in backend/.env
4. Whitelist your IP address in Atlas

#### Option B: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/agency-landing`

### 4. Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get credentials from dashboard
3. Update Cloudinary variables in backend/.env

### 5. Initialize Database

```bash
# Navigate to backend directory
cd backend

# Seed the database with sample data and admin user
node seedDb.js
```

### 6. Start Development Servers

#### Terminal 1 - Backend API
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

#### Terminal 2 - Frontend App
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 7. Verify Setup

Test the API endpoints:
```bash
cd backend
node test-api.js
```

## 📱 Application Features

### Frontend (Next.js)
- **Public Website**: Modern agency landing page
- **Admin Dashboard**: Content management interface
- **Responsive Design**: Works on all devices
- **Dark/Light Theme**: Toggle theme support
- **Smooth Animations**: Framer Motion animations

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based auth system
- **File Uploads**: Cloudinary integration
- **Data Validation**: Input validation and sanitization
- **Security**: Rate limiting, CORS, helmet protection
- **Database**: MongoDB with Mongoose ODM

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Projects
- `GET /api/projects` - Get all projects (public)
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (public)
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

### Team Members
- `GET /api/team` - Get all team members (public)
- `POST /api/team` - Create team member (admin)
- `PUT /api/team/:id` - Update team member (admin)
- `DELETE /api/team/:id` - Delete team member (admin)

### File Upload
- `POST /api/upload/project-image` - Upload project image
- `POST /api/upload/testimonial-avatar` - Upload testimonial avatar
- `POST /api/upload/team-avatar` - Upload team avatar

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev      # Start with nodemon
npm start        # Start production server
node seedDb.js   # Seed database
node test-api.js # Test API endpoints
```

## 📊 Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin`

**Default Login:**
- Email: `admin@weanovas.co.in`
- Password: `admin123`

### Dashboard Features
- **Projects Management**: Add, edit, delete projects
- **Testimonials Management**: Manage client testimonials
- **Team Management**: Add/remove team members
- **File Upload**: Image upload to Cloudinary
- **Content Ordering**: Drag & drop reordering
- **Status Management**: Active/inactive content

## 🚀 Production Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Use a production MongoDB cluster
4. Enable MongoDB IP whitelist for your server

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to your production API URL
2. Build and deploy to Vercel, Netlify, or similar platform

### Environment Variables for Production
- Use strong JWT secrets
- Enable secure database connections
- Configure proper CORS origins
- Set NODE_ENV=production

## 🛡️ Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent API abuse
- **Input Validation** with express-validator
- **CORS Protection** with configurable origins
- **Secure Headers** with helmet middleware

## 📝 API Usage Example

```javascript
// Frontend API client usage
import apiClient from '@/lib/api-client';

// Login
const login = async () => {
  try {
    const response = await apiClient.login('admin@weanovas.co.in', 'admin123');
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get projects
const getProjects = async () => {
  try {
    const response = await apiClient.getProjects({ status: 'active' });
    setProjects(response.projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error.message);
  }
};

// Create project with image
const createProject = async (formData, imageFile) => {
  try {
    const response = await apiClient.createProject(formData, imageFile);
    console.log('Project created:', response.project);
  } catch (error) {
    console.error('Failed to create project:', error.message);
  }
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: support@weanovas.co.in
- Website: https://weanovas.co.in

## 🔗 Related Files

- `backend/README.md` - Detailed backend documentation
- `backend/SETUP.md` - Step-by-step setup guide
- `frontend-api-client.js` - Frontend API client utility
