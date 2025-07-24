/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');
require('dotenv').config();

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const projects = await Project.find();
    const testimonials = await Testimonial.find();
    const teamMembers = await TeamMember.find();
    
    console.log('\n📁 Projects:', projects.length);
    projects.forEach((p, i) => console.log(`  ${i+1}. ${p.title}`));
    
    console.log('\n💬 Testimonials:', testimonials.length);
    testimonials.forEach((t, i) => console.log(`  ${i+1}. ${t.author} - ${t.quote.substring(0, 50)}...`));
    
    console.log('\n👥 Team Members:', teamMembers.length);
    teamMembers.forEach((tm, i) => console.log(`  ${i+1}. ${tm.name} - ${tm.role}`));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkData();
