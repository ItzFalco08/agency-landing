/**
 * API Client for Annovas Agency Backend
 * This file provides utility functions to interact with the backend API
 * Place this in your frontend's lib/utils or similar directory
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Get authentication token
  getToken() {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle FormData (for file uploads)
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.removeToken();
        throw new Error('Authentication required');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.removeToken();
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Project methods
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData, imageFile) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (key === 'tech' && Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/projects', {
      method: 'POST',
      body: formData,
    });
  }

  async updateProject(id, projectData, imageFile) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (key === 'tech' && Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  async toggleProjectFeatured(id) {
    return this.request(`/projects/${id}/toggle-featured`, { method: 'PUT' });
  }

  // Testimonial methods
  async getTestimonials(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/testimonials${queryString ? `?${queryString}` : ''}`);
  }

  async getTestimonial(id) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(testimonialData, avatarFile) {
    const formData = new FormData();
    
    Object.keys(testimonialData).forEach(key => {
      formData.append(key, testimonialData[key]);
    });
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.request('/testimonials', {
      method: 'POST',
      body: formData,
    });
  }

  async updateTestimonial(id, testimonialData, avatarFile) {
    const formData = new FormData();
    
    Object.keys(testimonialData).forEach(key => {
      formData.append(key, testimonialData[key]);
    });
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, { method: 'DELETE' });
  }

  async toggleTestimonialFeatured(id) {
    return this.request(`/testimonials/${id}/toggle-featured`, { method: 'PUT' });
  }

  // Team member methods
  async getTeamMembers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/team${queryString ? `?${queryString}` : ''}`);
  }

  async getTeamMember(id) {
    return this.request(`/team/${id}`);
  }

  async createTeamMember(teamMemberData, avatarFile) {
    const formData = new FormData();
    
    Object.keys(teamMemberData).forEach(key => {
      if (key === 'skills' && Array.isArray(teamMemberData[key])) {
        formData.append(key, JSON.stringify(teamMemberData[key]));
      } else {
        formData.append(key, teamMemberData[key]);
      }
    });
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.request('/team', {
      method: 'POST',
      body: formData,
    });
  }

  async updateTeamMember(id, teamMemberData, avatarFile) {
    const formData = new FormData();
    
    Object.keys(teamMemberData).forEach(key => {
      if (key === 'skills' && Array.isArray(teamMemberData[key])) {
        formData.append(key, JSON.stringify(teamMemberData[key]));
      } else {
        formData.append(key, teamMemberData[key]);
      }
    });
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.request(`/team/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async deleteTeamMember(id) {
    return this.request(`/team/${id}`, { method: 'DELETE' });
  }

  // File upload methods
  async uploadProjectImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.request('/upload/project-image', {
      method: 'POST',
      body: formData,
    });
  }

  async uploadTestimonialAvatar(avatarFile) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    return this.request('/upload/testimonial-avatar', {
      method: 'POST',
      body: formData,
    });
  }

  async uploadTeamAvatar(avatarFile) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    return this.request('/upload/team-avatar', {
      method: 'POST',
      body: formData,
    });
  }

  async deleteImage(publicId) {
    return this.request(`/upload/${publicId}`, { method: 'DELETE' });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

export default apiClient;

// Also export the class for creating custom instances
export { ApiClient };

// Usage examples:
/*
// In your React components:

import apiClient from '@/lib/api-client';

// Login
const handleLogin = async (email, password) => {
  try {
    const response = await apiClient.login(email, password);
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get projects
const fetchProjects = async () => {
  try {
    const response = await apiClient.getProjects({ 
      status: 'active', 
      featured: true,
      limit: 10 
    });
    setProjects(response.projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error.message);
  }
};

// Create project with image
const createProject = async (projectData, imageFile) => {
  try {
    const response = await apiClient.createProject(projectData, imageFile);
    console.log('Project created:', response.project);
  } catch (error) {
    console.error('Failed to create project:', error.message);
  }
};
*/
