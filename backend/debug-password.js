/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function debugPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const user = await User.findOne({ email: 'admin@weanovas.co.in' });
    console.log('👤 User found:', !!user);
    console.log('🔐 Stored password hash:', user.password);
    
    // Test bcrypt directly
    const plainPassword = 'admin123';
    const testHash = await bcrypt.hash(plainPassword, 12);
    console.log('🧪 Test hash:', testHash);
    
    const directComparison = await bcrypt.compare(plainPassword, user.password);
    console.log('🔍 Direct bcrypt comparison:', directComparison);
    
    const methodComparison = await user.comparePassword(plainPassword);
    console.log('📝 Method comparison:', methodComparison);
    
    // Test if the password field is being modified
    console.log('🔍 Password field type:', typeof user.password);
    console.log('🔍 Password field length:', user.password ? user.password.length : 'null');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

debugPassword();
