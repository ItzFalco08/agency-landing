/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Delete existing admin user
    await User.deleteOne({ email: 'admin@weanovas.co.in' });
    console.log('🗑️ Deleted existing admin user');
    
    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@weanovas.co.in',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });
    
    await adminUser.save();
    console.log('✅ Created new admin user');
    
    // Test the password
    const testUser = await User.findOne({ email: 'admin@weanovas.co.in' });
    const isPasswordValid = await testUser.comparePassword('admin123');
    console.log('🔑 Password test result:', isPasswordValid);
    
    console.log('🎉 Admin user reset successfully!');
    console.log('📝 Login credentials:');
    console.log('Email: admin@weanovas.co.in');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();
