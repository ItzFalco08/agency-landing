const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');

// Sample data
const sampleProjects = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/project1.png',
    link: 'https://example-ecommerce.com',
    featured: true
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, real-time notifications, and comprehensive financial management.',
    tech: ['React Native', 'Firebase', 'Node.js', 'PostgreSQL'],
    image: '/images/project2.png',
    link: 'https://example-banking.com',
    featured: false
  },
  {
    title: 'Healthcare Management System',
    description: 'Complete healthcare management solution for hospitals and clinics with patient records, appointment scheduling, and billing.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    image: '/images/project3.png',
    link: 'https://example-healthcare.com',
    featured: true
  }
];

const sampleTestimonials = [
  {
    quote: 'Working with Weanovas was an incredible experience. They delivered exactly what we needed and exceeded our expectations in every way.',
    author: 'John Smith',
    role: 'CEO',
    company: 'TechCorp Inc.',
    rating: 5
  },
  {
    quote: 'The team at Weanovas is highly professional and skilled. They transformed our ideas into a beautiful, functional product.',
    author: 'Sarah Johnson',
    role: 'CTO',
    company: 'Innovation Labs',
    rating: 5
  },
  {
    quote: 'Outstanding work! The attention to detail and quality of code is remarkable. Highly recommend Weanovas for any development project.',
    author: 'Michael Brown',
    role: 'Product Manager',
    company: 'StartupXYZ',
    rating: 5
  }
];

const sampleTeamMembers = [
  {
    name: 'Anubhav Singh',
    role: 'Founder & CEO',
    email: 'anubhav@weanovas.co.in',
    location: 'Mumbai, India',
    joinedYear: '2022',
    bio: 'Visionary leader with 8+ years of experience in software development and business strategy. Passionate about creating innovative solutions that drive business growth.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/anubhav-singh',
      twitter: 'https://twitter.com/anubhav_singh',
      github: 'https://github.com/anubhav-singh'
    }
  },
  {
    name: 'Hetvi Patel',
    role: 'Social Media Manager',
    email: 'hetvi@weanovas.co.in',
    location: 'Ahmedabad, India',
    joinedYear: '2023',
    bio: 'Creative social media strategist who crafts compelling brand stories and builds engaging online communities. Expert in digital marketing and content creation.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/hetvi-patel',
      twitter: 'https://twitter.com/hetvi_patel'
    }
  },
  {
    name: 'Raj Sharma',
    role: 'Full Stack Developer',
    email: 'raj@weanovas.co.in',
    location: 'Bangalore, India',
    joinedYear: '2023',
    bio: 'Experienced full-stack developer specializing in React, Node.js, and cloud technologies. Passionate about building scalable and efficient web applications.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/raj-sharma',
      github: 'https://github.com/raj-sharma'
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await TeamMember.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@weanovas.co.in',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Created admin user');

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`📁 Created ${projects.length} projects`);

    // Insert sample testimonials
    const testimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`💬 Created ${testimonials.length} testimonials`);

    // Insert sample team members
    const teamMembers = await TeamMember.insertMany(sampleTeamMembers);
    console.log(`👥 Created ${teamMembers.length} team members`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('Email: admin@weanovas.co.in');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
