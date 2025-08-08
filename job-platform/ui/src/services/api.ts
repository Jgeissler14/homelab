const API_BASE = '/api';

export interface JobRequest {
  template: string;
  id: string;
  params: {
    container_name: string;
    image: string;
    command: string[];
  };
}

export interface JobResponse {
  job_name: string;
}

export interface JobStatus {
  status: string;
}

export interface JobLogs {
  log: string;
}

export const api = {
  async runJob(request: JobRequest): Promise<JobResponse> {
    const response = await fetch(`${API_BASE}/jobs/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to run job: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getJobStatus(jobName: string): Promise<JobStatus> {
    const response = await fetch(`${API_BASE}/jobs/${jobName}/status`);
    
    if (!response.ok) {
      throw new Error(`Failed to get job status: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getJobLogs(jobName: string): Promise<JobLogs> {
    const response = await fetch(`${API_BASE}/jobs/${jobName}/logs`);
    
    if (!response.ok) {
      throw new Error(`Failed to get job logs: ${response.statusText}`);
    }
    
    return response.json();
  },
};