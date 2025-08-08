import { useState, useEffect } from "react";
import { jobs } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import { JobStatus } from "@/components/JobStatus";
import { LogsViewer } from "@/components/LogsViewer";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Container, Zap, Activity } from "lucide-react";

interface RunningJob {
  jobName: string;
  status: string;
  jobId: string;
}

const Index = () => {
  const [runningJobs, setRunningJobs] = useState<Record<string, RunningJob>>({});
  const [selectedLogs, setSelectedLogs] = useState<{ jobName: string; logs: string } | null>(null);
  const { toast } = useToast();

  const runJob = async (job: any) => {
    try {
      const response = await api.runJob({
        template: job.template,
        id: job.id,
        params: job.params,
      });

      setRunningJobs(prev => ({
        ...prev,
        [job.id]: {
          jobName: response.job_name,
          status: 'Running',
          jobId: job.id,
        }
      }));

      toast({
        title: "Container deployed",
        description: `${job.name} workload has been submitted successfully`,
      });

      // Start polling for status
      pollJobStatus(response.job_name, job.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy container workload",
        variant: "destructive",
      });
    }
  };

  const pollJobStatus = async (jobName: string, jobId: string) => {
    const poll = async () => {
      try {
        const status = await api.getJobStatus(jobName);
        
        setRunningJobs(prev => ({
          ...prev,
          [jobId]: {
            ...prev[jobId],
            status: status.status,
          }
        }));

        if (status.status !== 'Running') {
          toast({
            title: "Workload completed",
            description: `Container ${jobName} finished with status: ${status.status}`,
            variant: status.status === 'Succeeded' ? 'default' : 'destructive',
          });
          return;
        }

        // Continue polling if still running
        setTimeout(poll, 3000);
      } catch (error) {
        console.error('Error polling job status:', error);
      }
    };

    poll();
  };

  const refreshJobStatus = async (jobName: string) => {
    try {
      const status = await api.getJobStatus(jobName);
      const jobEntry = Object.entries(runningJobs).find(([_, job]) => job.jobName === jobName);
      
      if (jobEntry) {
        const [jobId] = jobEntry;
        setRunningJobs(prev => ({
          ...prev,
          [jobId]: {
            ...prev[jobId],
            status: status.status,
          }
        }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh job status",
        variant: "destructive",
      });
    }
  };

  const viewLogs = async (jobName: string) => {
    try {
      const logs = await api.getJobLogs(jobName);
      setSelectedLogs({ jobName, logs: logs.log });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job logs",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-gradient-card shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Container className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Enterprise Container Platform
              </h1>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                {Object.keys(runningJobs).length} active workloads
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Available Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Container Workloads</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onRun={runJob}
                  isRunning={!!runningJobs[job.id] && runningJobs[job.id].status === 'Running'}
                />
              ))}
            </div>
          </div>

          {/* Job Status Panel */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Execution Status</h2>
            </div>
            
            <div className="space-y-3">
              {Object.values(runningJobs).map((job) => (
                <JobStatus
                  key={job.jobName}
                  jobName={job.jobName}
                  status={job.status}
                  onViewLogs={viewLogs}
                  onRefresh={refreshJobStatus}
                />
              ))}
              
              {Object.keys(runningJobs).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Container className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No active workloads</p>
                  <p className="text-sm">Deploy a container to monitor execution</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logs Viewer */}
        {selectedLogs && (
          <div className="mt-8">
            <LogsViewer
              jobName={selectedLogs.jobName}
              logs={selectedLogs.logs}
              onClose={() => setSelectedLogs(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
