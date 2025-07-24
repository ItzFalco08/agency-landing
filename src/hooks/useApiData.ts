import { useState, useEffect } from 'react';
import { apiClient, Project, Testimonial, TeamMember } from '@/lib/api';

// Generic hook for API data management
function useApiData<T>(fetchFn: () => Promise<{ data?: T[] }>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFn();
      console.log('API Response:', response); // Debug log
      if (response.data) {
        console.log('Setting data:', response.data); // Debug log
        setData(response.data);
      } else {
        console.log('No data in response:', response); // Debug log
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return { data, loading, error, refetch: fetchData };
}

// Projects hook
export function useProjects() {
  const { data: projects, loading, error, refetch } = useApiData<Project>(
    () => apiClient.getProjects()
  );

  const createProject = async (projectData: Omit<Project, '_id'>) => {
    try {
      await apiClient.createProject(projectData);
      await refetch();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      await apiClient.updateProject(id, projectData);
      await refetch();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await apiClient.deleteProject(id);
      await refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch,
  };
}

// Testimonials hook
export function useTestimonials() {
  const { data: testimonials, loading, error, refetch } = useApiData<Testimonial>(
    () => apiClient.getTestimonials()
  );

  const createTestimonial = async (testimonialData: Omit<Testimonial, '_id'>) => {
    try {
      await apiClient.createTestimonial(testimonialData);
      await refetch();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    try {
      await apiClient.updateTestimonial(id, testimonialData);
      await refetch();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await apiClient.deleteTestimonial(id);
      await refetch();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  };

  return {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch,
  };
}

// Team members hook
export function useTeamMembers() {
  const { data: teamMembers, loading, error, refetch } = useApiData<TeamMember>(
    () => apiClient.getTeamMembers()
  );

  const createTeamMember = async (memberData: Omit<TeamMember, '_id'>) => {
    try {
      await apiClient.createTeamMember(memberData);
      await refetch();
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  };

  const updateTeamMember = async (id: string, memberData: Partial<TeamMember>) => {
    try {
      await apiClient.updateTeamMember(id, memberData);
      await refetch();
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await apiClient.deleteTeamMember(id);
      await refetch();
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  };

  return {
    teamMembers,
    loading,
    error,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    refetch,
  };
}
