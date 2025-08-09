import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Zap } from "lucide-react";
import { Agent } from "../types";

interface AgentProps {
  agent: Agent;
  isActive: boolean;
  onClick: () => void;
  workload?: number;
}

export function AgentComponent({ agent, isActive, onClick, workload = 0 }: AgentProps) {
  const statusColors = {
    active: 'bg-green-400 shadow-green-400/50',
    idle: 'bg-yellow-400 shadow-yellow-400/50',
    busy: 'bg-red-400 shadow-red-400/50',
    offline: 'bg-gray-400'
  };

  const statusLabels = {
    active: 'Active',
    idle: 'Idle',
    busy: 'Busy',
    offline: 'Offline'
  };

  return (
    <div 
      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md w-full ${
        isActive 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
          : 'bg-card hover:bg-accent/50 border border-border'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3 min-w-0">
        <div className="relative flex-shrink-0">
          <Avatar className="w-10 h-10 border-2 border-white/20">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback className="agent-gradient text-white text-sm">
              {agent.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div 
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[agent.status]} shadow-sm`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h4 className={`truncate text-sm ${isActive ? 'text-white' : ''}`}>
              {agent.name}
            </h4>
            <Badge 
              variant={isActive ? "secondary" : "outline"} 
              className={`text-xs flex-shrink-0 ${isActive ? 'bg-white/20 text-white border-white/30' : ''}`}
            >
              {statusLabels[agent.status]}
            </Badge>
          </div>
          
          <p className={`text-xs truncate mb-2 leading-tight ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
            {agent.specialty}
          </p>
          
          <div className="space-y-2">            
            {agent.status === 'busy' && workload > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`flex items-center gap-1 ${isActive ? 'text-white/70' : 'text-muted-foreground'}`}>
                    <Zap className="w-3 h-3" />
                    Workload
                  </span>
                  <span className={`${isActive ? 'text-white' : ''} text-xs`}>{workload}%</span>
                </div>
                <Progress value={workload} className="h-1" />
              </div>
            )}
            
            <div className="flex gap-1 flex-wrap">
              {agent.capabilities.slice(0, 2).map((capability) => (
                <Badge 
                  key={capability} 
                  variant="outline" 
                  className={`text-xs px-1.5 py-0.5 truncate max-w-[80px] ${
                    isActive ? 'border-white/30 text-white/80' : ''
                  }`}
                  title={capability}
                >
                  {capability}
                </Badge>
              ))}
              {agent.capabilities.length > 2 && (
                <Badge 
                  variant="outline" 
                  className={`text-xs px-1.5 py-0.5 flex-shrink-0 ${
                    isActive ? 'border-white/30 text-white/80' : ''
                  }`}
                  title={`${agent.capabilities.length - 2} more capabilities`}
                >
                  +{agent.capabilities.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}