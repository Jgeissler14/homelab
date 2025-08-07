import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, RotateCcw, Eye, Terminal } from "lucide-react";

interface JobStatusProps {
  jobName: string;
  status: string;
  onViewLogs: (jobName: string) => void;
  onRefresh: (jobName: string) => void;
}

export function JobStatus({ jobName, status, onViewLogs, onRefresh }: JobStatusProps) {
  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'running':
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = () => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'running':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Terminal className="h-4 w-4 text-primary" />
          {jobName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusVariant() as any} className="flex items-center gap-1">
            {getStatusIcon()}
            {status}
          </Badge>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRefresh(jobName)}
              className="h-7 w-7 p-0"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewLogs(jobName)}
              className="h-7 w-7 p-0"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}