/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const user = await User.findOne({ email: 'admin@weanovas.co.in' });
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('👤 Found user:', user.email);
    console.log('🔐 isActive:', user.isActive);
    console.log('🔑 Testing password...');
    
    const isPasswordValid = await user.comparePassword('admin123');
    console.log('✅ Password valid:', isPasswordValid);
    
    // Test a wrong password
    const isWrongPasswordValid = await user.comparePassword('wrong');
    console.log('❌ Wrong password valid:', isWrongPasswordValid);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
