/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createSimpleAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Delete existing admin user
    await User.deleteOne({ email: 'admin@weanovas.co.in' });
    console.log('🗑️ Deleted existing admin user');
    
    // Create a user without triggering the pre-save hook
    const plainPassword = 'admin123';
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    
    console.log('🔐 Plain password:', plainPassword);
    console.log('🧂 Salt rounds:', saltRounds);
    console.log('🔒 Hashed password:', hashedPassword);
    
    // Test the hash immediately
    const immediateTest = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('✅ Immediate test:', immediateTest);
    
    // Create user directly in database
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@weanovas.co.in',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });
    
    console.log('✅ Created admin user');
    
    // Fetch and test
    const savedUser = await User.findOne({ email: 'admin@weanovas.co.in' });
    console.log('🔍 Saved password hash:', savedUser.password);
    console.log('🔍 Hashes match:', hashedPassword === savedUser.password);
    
    const finalTest = await bcrypt.compare(plainPassword, savedUser.password);
    console.log('🎯 Final test:', finalTest);
    
    const methodTest = await savedUser.comparePassword(plainPassword);
    console.log('📝 Method test:', methodTest);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createSimpleAdmin();
