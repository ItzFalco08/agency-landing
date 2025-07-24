// API utility for communicating with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  token?: string;
}

interface User {
  _id: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  featured?: boolean;
}

interface Testimonial {
  _id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  email: string;
  location: string;
  joinedYear: string;
  bio: string;
  avatar?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        // Only set Content-Type for non-FormData requests
        ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User }>> {
    const response = await this.request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', response.token);
      }
    }

    return response;
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  // Projects API
  async getProjects(): Promise<ApiResponse<Project[]>> {
    const response = await this.request<{ projects: Project[]; pagination: object }>('/projects');
    // Backend returns { projects: [...], pagination: {...} } directly
    const projectsData = response as unknown as { projects: Project[]; pagination: object };
    return {
      success: true,
      data: projectsData.projects || []
    };
  }

  async createProject(projectData: Omit<Project, '_id'>): Promise<ApiResponse<Project>> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials API
  async getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    const response = await this.request<{ testimonials: Testimonial[]; pagination: object }>('/testimonials');
    // Backend returns { testimonials: [...], pagination: {...} } directly
    const testimonialsData = response as unknown as { testimonials: Testimonial[]; pagination: object };
    return {
      success: true,
      data: testimonialsData.testimonials || []
    };
  }

  async createTestimonial(testimonialData: Omit<Testimonial, '_id'>): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  async updateTestimonial(id: string, testimonialData: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  }

  async deleteTestimonial(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Team Members API
  async getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
    const response = await this.request<{ teamMembers: TeamMember[]; pagination: object }>('/team');
    // Backend returns { teamMembers: [...], pagination: {...} } directly
    const teamData = response as unknown as { teamMembers: TeamMember[]; pagination: object };
    return {
      success: true,
      data: teamData.teamMembers || []
    };
  }

  async createTeamMember(memberData: Omit<TeamMember, '_id'>): Promise<ApiResponse<TeamMember>> {
    return this.request<TeamMember>('/team', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateTeamMember(id: string, memberData: Partial<TeamMember>): Promise<ApiResponse<TeamMember>> {
    return this.request<TeamMember>(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteTeamMember(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/team/${id}`, {
      method: 'DELETE',
    });
  }

  // File Upload API
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string }>('/upload/image', {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  async uploadProjectImage(file: File): Promise<ApiResponse<{ image: { url: string; publicId: string } }>> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await this.request<{ message: string; image: { url: string; publicId: string; originalName: string; size: number } }>('/upload/project-image', {
      method: 'POST',
      body: formData,
    });

    // The backend returns the image data directly, not wrapped in ApiResponse format
    const uploadData = response as unknown as { message: string; image: { url: string; publicId: string; originalName: string; size: number } };
    
    return {
      success: true,
      data: {
        image: {
          url: uploadData.image.url,
          publicId: uploadData.image.publicId
        }
      }
    };
  }

  async uploadTeamAvatar(file: File): Promise<ApiResponse<{ avatar: { url: string; publicId: string } }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await this.request<{ message: string; avatar: { url: string; publicId: string; originalName: string; size: number } }>('/upload/team-avatar', {
      method: 'POST',
      body: formData,
    });

    // The backend returns the avatar data directly, not wrapped in ApiResponse format
    const uploadData = response as unknown as { message: string; avatar: { url: string; publicId: string; originalName: string; size: number } };
    
    return {
      success: true,
      data: {
        avatar: {
          url: uploadData.avatar.url,
          publicId: uploadData.avatar.publicId
        }
      }
    };
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type { Project, Testimonial, TeamMember, LoginCredentials, ApiResponse };
