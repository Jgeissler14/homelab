import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Terminal, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogsViewerProps {
  jobName: string;
  logs: string;
  onClose: () => void;
}

export function LogsViewer({ jobName, logs, onClose }: LogsViewerProps) {
  const { toast } = useToast();

  const copyLogs = () => {
    navigator.clipboard.writeText(logs);
    toast({
      title: "Logs copied",
      description: "Job logs have been copied to clipboard",
    });
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Logs - {jobName}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={copyLogs}
              className="h-7 w-7 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-7 w-7 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-64 w-full rounded border bg-muted/30">
          <pre className="p-4 text-xs font-mono text-foreground whitespace-pre-wrap">
            {logs || "No logs available"}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}