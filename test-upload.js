const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

// Test the upload endpoint
async function testUpload() {
  try {
    // First, get an auth token
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@weanovas.co.in',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (!loginData.token) {
      console.error('Failed to get auth token');
      return;
    }

    // Test the upload endpoint structure
    const healthResponse = await fetch('http://localhost:5000/api/upload/project-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
      }
    });

    const healthData = await healthResponse.text();
    console.log('Upload endpoint test:', healthData);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testUpload();
