export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'idle' | 'busy' | 'offline';
  specialty: string;
  color: string;
  capabilities: string[];
  priority: number;
}

export interface Message {
  id: string;
  agentId?: string;
  userId?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'interactive' | 'handoff' | 'system';
  interactive?: InteractiveMessage;
  editable?: boolean;
  edited?: boolean;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface InteractiveMessage {
  type: 'buttons' | 'dropdown' | 'cards' | 'list';
  options?: InteractiveOption[];
  cards?: InteractiveCard[];
  prompt?: string;
  multiSelect?: boolean;
}

export interface InteractiveOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: string;
  action?: () => void;
}

export interface InteractiveCard {
  id: string;
  title: string;
  description: string;
  image?: string;
  badge?: string;
  actions: InteractiveOption[];
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'waiting' | 'completed' | 'paused';
  currentTaskId: string;
  currentAgent: string;
  previousAgents: string[];
  userPreferences: Record<string, any>;
  sessionData: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedAgent: string;
  requiredCapabilities: string[];
  progress: number;
  startTime?: Date;
  estimatedCompletion?: Date;
  dependencies: string[];
}

export interface AgentProtocol {
  canHandleTask: (task: Task) => boolean;
  shouldTransfer: (context: ConversationContext, userInput: string) => Agent | null;
  generateResponse: (userInput: string, context: ConversationContext) => Promise<Message>;
}