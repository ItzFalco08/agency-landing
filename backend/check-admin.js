/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const adminUser = await User.findOne({ email: 'admin@weanovas.co.in' });
    if (adminUser) {
      console.log('👤 Admin user found:');
      console.log('Email:', adminUser.email);
      console.log('Name:', adminUser.name);
      console.log('Role:', adminUser.role);
      console.log('Password hash exists:', !!adminUser.password);
    } else {
      console.log('❌ Admin user not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdmin();
