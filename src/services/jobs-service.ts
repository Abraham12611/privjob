import { apiClient, type Job as ApiJob, type PaginatedResponse } from '@/lib/api'

export class JobsService {
  static async getJobs(params?: {
    search?: string;
    location?: string;
    remote?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<ApiJob[]> {
    try {
      const response = await apiClient.getJobs(params);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }
  
  static async getJob(id: string): Promise<ApiJob> {
    try {
      const response = await apiClient.getJob(id);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch job:', error);
      throw new Error('Failed to fetch job');
    }
  }

  static async searchJobs(query: string, filters?: {
    location?: string;
    remote?: boolean;
  }): Promise<ApiJob[]> {
    return this.getJobs({
      search: query,
      ...filters
    });
  }
}
