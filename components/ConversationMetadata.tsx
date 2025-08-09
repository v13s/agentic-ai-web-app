import { Progress } from "./ui/progress";
import { Clock, Target } from "lucide-react";
import { ConversationContext, Task } from "../types";

interface ConversationMetadataProps {
  context: ConversationContext;
  currentTask: Task;
}

export function ConversationMetadata({ context, currentTask }: ConversationMetadataProps) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="mb-1">{context.title}</h4>
        <p className="text-sm text-muted-foreground">{context.description}</p>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Target className="w-3 h-3" />
        <span>Task:</span>
        <span className="font-mono">{currentTask.id.slice(-6)}</span>
      </div>

      {currentTask.status === 'in-progress' && (
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Task Progress</span>
            <span>{currentTask.progress}%</span>
          </div>
          <Progress value={currentTask.progress} className="h-1" />
        </div>
      )}

      {currentTask.estimatedCompletion && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>ETA: {currentTask.estimatedCompletion.toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
}