/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function fixAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Delete existing admin user
    await User.deleteOne({ email: 'admin@weanovas.co.in' });
    console.log('🗑️ Deleted existing admin user');
    
    // Create user using new User() and save() to properly trigger pre-save hook
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@weanovas.co.in',
      password: 'admin123', // Plain password - let the pre-save hook handle hashing
      role: 'admin',
      isActive: true
    });
    
    await adminUser.save();
    console.log('✅ Created admin user with pre-save hook');
    
    // Test the password
    const savedUser = await User.findOne({ email: 'admin@weanovas.co.in' });
    const isPasswordValid = await savedUser.comparePassword('admin123');
    console.log('🔑 Password test result:', isPasswordValid);
    
    if (isPasswordValid) {
      console.log('🎉 Admin user created successfully!');
      console.log('📝 Login credentials:');
      console.log('Email: admin@weanovas.co.in');
      console.log('Password: admin123');
    } else {
      console.log('❌ Password test failed');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixAdminUser();
