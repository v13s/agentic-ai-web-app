import { useState } from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowRight, Users } from "lucide-react";
import { AgentComponent } from "./Agent";
import { Agent } from "../types";

interface AgentHandoffProps {
  currentAgent: Agent;
  availableAgents: Agent[];
  onHandoff: (targetAgent: Agent, reason: string) => void;
}

export function AgentHandoff({ currentAgent, availableAgents, onHandoff }: AgentHandoffProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [reason, setReason] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleHandoff = () => {
    if (selectedAgent && reason.trim()) {
      onHandoff(selectedAgent, reason.trim());
      setSelectedAgent(null);
      setReason('');
      setIsOpen(false);
    }
  };

  const filteredAgents = availableAgents.filter(agent => 
    agent.id !== currentAgent.id && agent.status !== 'offline'
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="w-4 h-4 mr-2" />
          Hand off
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Hand off conversation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Current Agent</Label>
            <div className="mt-1">
              <AgentComponent
                agent={currentAgent}
                isActive={false}
                onClick={() => {}}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div>
            <Label>Transfer to</Label>
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {filteredAgents.map((agent) => (
                <AgentComponent
                  key={agent.id}
                  agent={agent}
                  isActive={selectedAgent?.id === agent.id}
                  onClick={() => setSelectedAgent(agent)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="reason">Reason for handoff</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you transferring this conversation?"
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleHandoff}
              disabled={!selectedAgent || !reason.trim()}
            >
              Transfer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}