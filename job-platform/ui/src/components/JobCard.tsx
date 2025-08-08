import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Terminal, Clock } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    name: string;
    description: string;
    template: string;
    params: {
      container_name: string;
      image: string;
      command: string[];
    };
  };
  onRun: (job: any) => void;
  isRunning?: boolean;
}

export function JobCard({ job, onRun, isRunning }: JobCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              {job.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {job.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {job.template}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Image:</span>
            <code className="text-primary bg-muted px-2 py-1 rounded font-mono text-xs max-w-xs break-all whitespace-pre-line">
              {job.params.image}
            </code>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Command:</span>
            <code className="text-primary bg-muted px-2 py-1 rounded font-mono text-xs max-w-xs break-all whitespace-pre-line">
              {job.params.command.join(' ')}
            </code>
          </div>
        </div>
        
        <Button 
          onClick={() => onRun(job)} 
          disabled={isRunning}
          variant="gradient"
          className="w-full"
        >
          {isRunning ? (
            <>
              <Clock className="h-4 w-4 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Deploy Container
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}