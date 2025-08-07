export interface JobLogs {
  log: string;
}

export interface User {
  username: string;
}

export interface Job {
  name: string;
  status: string;
  template: string;
  user: string;
  params: Record<string, any>;
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

  async getUser(): Promise<User> {
    const response = await fetch(`${API_BASE}/user`);

    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }

    return response.json();
  },

  async getJobs(): Promise<{ jobs: Job[] }> {
    const response = await fetch(`${API_BASE}/jobs`);

    if (!response.ok) {
      throw new Error(`Failed to get jobs: ${response.statusText}`);
    }

    return response.json();
  },
};