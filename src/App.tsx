import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from './components/ui/scroll-area';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Trash2, RotateCcw, Users, Activity, Home, BarChart3, Settings, LayoutDashboard, Clock, Star, FileBarChart2, Sparkles, Plus } from "lucide-react";
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { AgentComponent } from './components/Agent';
import { ConversationMetadata } from './components/ConversationMetadata';
import { Agent, Message, ConversationContext, InteractiveMessage, Task } from "./types";
import { 
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './components/ui/sidebar';
import { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Separator } from './components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './components/ui/hover-card';

import './styles/globals.css'

// Submenu Panel Component that uses useSidebar hook
function SubmenuPanel({ activeSubmenu, agents }: { activeSubmenu: string; agents: Agent[] }) {
  const { state } = useSidebar();
  const sidebarCollapsed = state === 'collapsed';
  
  return (
    <div 
      className="fixed z-50 flex flex-col bg-white dark:bg-slate-800 border-l shadow-md"
      data-submenu
              style={{ 
          left: sidebarCollapsed ? '5rem' : '16.5rem', 
          top: '0px', 
          height: '100vh',
          width: activeSubmenu === 'home' || activeSubmenu === 'settings' ? '20rem' : '24rem'
        }}
    >

      
      {/* Home Submenu */}
      {activeSubmenu === 'home' && (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 flex-shrink-0 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg font-medium">Home</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">Quick</Badge>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="bg-card p-3 space-y-3">
              <SidebarMenuSub className="border-l-0 px-0 mx-0">
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Access your overview with KPIs and activity.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Recent</span>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Jump back into your recent activity.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>Starred</span>
                        <Badge variant="outline">5</Badge>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Your favorites for quick access.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
              </SidebarMenuSub>

              <Separator className="my-2" />
              <div className="border rounded-md bg-muted p-3">
                <SidebarGroupLabel className="px-1">Quick actions</SidebarGroupLabel>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full">New Project</Button>
                  <Button size="sm" variant="outline" className="w-full">Import</Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </>
      )}

      {/* Agents Submenu */}
      {activeSubmenu === 'agents' && (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 flex-shrink-0 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg font-medium">Agents</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">{agents.length} total</Badge>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="bg-card p-3 space-y-3">
              <SidebarGroupLabel className="px-1">Manage</SidebarGroupLabel>
              <SidebarMenuSub className="border-0 shadow-none bg-transparent px-0 py-0 mx-0">
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>All Agents</span>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Browse and manage every agent in your workspace.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Teams</span>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Organize agents into functional teams.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Create Agent</span>
                        <Badge variant="outline">New</Badge>
                      </SidebarMenuSubButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="start">
                      Spin up a new agent with prebuilt templates.
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuSubItem>
              </SidebarMenuSub>

              <Separator className="my-2" />
              <SidebarGroupLabel className="px-1">Quick switch</SidebarGroupLabel>
              <ScrollArea className="max-h-64">
                <SidebarMenuSub className="border-l-0 px-0 mx-0">
                  {agents.slice(0, 6).map((agent) => (
                    <SidebarMenuSubItem key={agent.id}>
                      <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>{agent.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">{agent.name}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </ScrollArea>
            </div>
          </ScrollArea>
        </>
      )}

      {/* Analytics Submenu */}
      {activeSubmenu === 'analytics' && (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 flex-shrink-0 border-b border-white/10">
            <span className="text-base md:text-lg font-medium">Analytics</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="bg-card p-3 space-y-3">
              <SidebarGroupLabel className="px-1">Dashboards</SidebarGroupLabel>
              <SidebarMenuSub className="border-l-0 px-0 mx-0">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Overview</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                    <FileBarChart2 className="w-4 h-4" />
                    <span>Reports</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Custom Dashboard</span>
                    <Badge variant="outline">New</Badge>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>

              <Separator className="my-2" />
              <div className="text-xs text-muted-foreground px-3 py-1.5 bg-accent/20 rounded">
                Performance is up 12% week over week.
              </div>
            </div>
          </ScrollArea>
        </>
      )}

      {/* Settings Submenu */}
      {activeSubmenu === 'settings' && (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 flex-shrink-0 border-b border-white/10">
            <span className="text-base md:text-lg font-medium">Settings</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-3">
              <SidebarGroupLabel className="px-1 bg-muted rounded md:rounded-md px-2 py-1 w-fit">Preferences</SidebarGroupLabel>
              <SidebarMenuSub className="border-l-0 px-0 mx-0">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#" className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>About</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>

              <Separator className="my-2" />
              <div className="border rounded-md bg-muted/30 p-3">
                <SidebarGroupLabel className="px-1">Theme</SidebarGroupLabel>
                <div className="flex gap-2">
                  <div className="h-6 w-10 rounded bg-background border" />
                  <div className="h-6 w-10 rounded bg-card border" />
                  <div className="h-6 w-10 rounded bg-muted border" />
                </div>
              </div>
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (activeSubmenu && !target.closest('[data-sidebar]') && !target.closest('[data-submenu]')) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeSubmenu]);
    
  const [agents] = useState<Agent[]>([
    {
      id: 'orchestrator',
      name: 'AI Orchestrator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      specialty: 'Task Coordination & Agent Management',
      color: '#6366f1',
      capabilities: ['routing', 'coordination', 'context-switching', 'task-planning'],
      priority: 10
    },
    {
      id: 'data-specialist',
      name: 'Data Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'idle',
      specialty: 'Analytics, Visualization & Business Intelligence',
      color: '#8b5cf6',
      capabilities: ['analytics', 'visualization', 'reporting', 'insights'],
      priority: 8
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'busy',
      specialty: 'Content Strategy, Writing & Creative Solutions',
      color: '#3b82f6',
      capabilities: ['writing', 'creativity', 'branding', 'strategy'],
      priority: 7
    },
    {
      id: 'tech-advisor',
      name: 'Tech Advisor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      specialty: 'Technical Solutions & System Architecture',
      color: '#06b6d4',
      capabilities: ['architecture', 'debugging', 'optimization', 'security'],
      priority: 9
    },
    {
      id: 'business-analyst',
      name: 'Business Analyst',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      status: 'idle',
      specialty: 'Process Optimization & Strategic Planning',
      color: '#10b981',
      capabilities: ['analysis', 'optimization', 'planning', 'metrics'],
      priority: 6
    }
  ]);

  const [context, setContext] = useState<ConversationContext>({
    id: 'ctx_2024_001',
    title: 'E-commerce Platform Enhancement',
    description: 'Comprehensive analysis and improvement of the customer experience platform',
    status: 'active',
    currentTaskId: 'task_initial_assessment',
    currentAgent: 'orchestrator',
    previousAgents: [],
    userPreferences: {},
    sessionData: {},
    priority: 'high',
    tags: ['e-commerce', 'ux-improvement', 'data-analysis']
  });

  const [currentTask, setCurrentTask] = useState<Task>({
    id: 'task_initial_assessment',
    title: 'Initial Requirements Assessment',
    description: 'Understanding user needs and project scope',
    status: 'in-progress',
    assignedAgent: 'orchestrator',
    requiredCapabilities: ['coordination', 'analysis'],
    progress: 25,
    startTime: new Date(),
    estimatedCompletion: new Date(Date.now() + 10 * 60 * 1000),
    dependencies: []
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      agentId: 'orchestrator',
      content: 'Hello! I\'m your AI Orchestrator. I can see you\'re working on an e-commerce platform enhancement. Let me help coordinate the best approach for your project.',
      timestamp: new Date(Date.now() - 5000),
      type: 'text',
      editable: false,
      confidence: 0.95
    },
    {
      id: '2',
      agentId: 'orchestrator',
      content: 'I\'ve assembled a team of specialized agents to help with your project. What specific aspect would you like to focus on first?',
      timestamp: new Date(),
      type: 'interactive',
      editable: false,
      interactive: {
        type: 'cards',
        cards: [
          {
            id: 'data_analysis',
            title: 'Data Analysis',
            description: 'Analyze customer behavior and platform performance',
            badge: 'Priority: High',
            actions: [
              { id: 'start_analysis', label: 'Start Analysis', value: 'data_analysis' },
              { id: 'view_metrics', label: 'View Current Metrics', value: 'view_metrics' }
            ]
          },
          {
            id: 'ux_review',
            title: 'UX Review',
            description: 'Evaluate user experience and interface design',
            badge: 'Priority: Medium',
            actions: [
              { id: 'start_ux', label: 'Begin UX Audit', value: 'ux_review' },
              { id: 'user_feedback', label: 'Collect Feedback', value: 'user_feedback' }
            ]
          },
          {
            id: 'tech_architecture',
            title: 'Technical Architecture',
            description: 'Review system performance and scalability',
            badge: 'Priority: Medium',
            actions: [
              { id: 'tech_audit', label: 'Technical Audit', value: 'tech_audit' },
              { id: 'performance', label: 'Performance Review', value: 'performance' }
            ]
          }
        ]
      }
    }
  ]);

  const [currentAgent, setCurrentAgent] = useState<Agent>(agents[0]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const automaticHandoff = (userInput: string): Agent | null => {
    const input = userInput.toLowerCase();
    
    // Data analysis keywords
    if (input.includes('data') || input.includes('analytics') || input.includes('metrics') || 
        input.includes('report') || input.includes('insights') || input.includes('dashboard')) {
      return agents.find(a => a.id === 'data-specialist') || null;
    }
    
    // Content creation keywords
    if (input.includes('content') || input.includes('write') || input.includes('copy') ||
        input.includes('blog') || input.includes('social') || input.includes('marketing')) {
      return agents.find(a => a.id === 'content-creator') || null;
    }
    
    // Technical keywords
    if (input.includes('technical') || input.includes('code') || input.includes('api') ||
        input.includes('database') || input.includes('server') || input.includes('performance')) {
      return agents.find(a => a.id === 'tech-advisor') || null;
    }
    
    // Business analysis keywords
    if (input.includes('business') || input.includes('process') || input.includes('workflow') ||
        input.includes('optimization') || input.includes('efficiency') || input.includes('cost')) {
      return agents.find(a => a.id === 'business-analyst') || null;
    }
    
    return null;
  };

  const generateAgentResponse = (agentId: string, userInput: string): Omit<Message, 'id' | 'timestamp'> => {
    const agent = agents.find(a => a.id === agentId);
    
    if (agentId === 'data-specialist') {
      const interactive: InteractiveMessage = {
        type: 'buttons',
        options: [
          { id: 'customer_behavior', label: 'Customer Behavior', value: 'customer_behavior', description: 'Analyze user journeys and patterns' },
          { id: 'sales_funnel', label: 'Sales Funnel', value: 'sales_funnel', description: 'Conversion rate analysis' },
          { id: 'product_performance', label: 'Product Performance', value: 'product_performance', description: 'Top/bottom performers' },
          { id: 'custom_report', label: 'Custom Report', value: 'custom_report', description: 'Build specific analysis' }
        ]
      };
      
      return {
        agentId,
        content: 'Perfect! I\'m your Data Specialist. I can analyze various aspects of your e-commerce platform. What type of analysis would be most valuable right now?',
        type: 'interactive',
        interactive,
        confidence: 0.92
      };
    }
    
    if (agentId === 'content-creator') {
      const interactive: InteractiveMessage = {
        type: 'dropdown',
        prompt: 'What type of content enhancement are you looking for?',
        options: [
          { id: 'product_descriptions', label: 'Product Descriptions', value: 'product_descriptions' },
          { id: 'email_campaigns', label: 'Email Campaigns', value: 'email_campaigns' },
          { id: 'landing_pages', label: 'Landing Pages', value: 'landing_pages' },
          { id: 'social_content', label: 'Social Media Content', value: 'social_content' },
          { id: 'blog_content', label: 'Blog & SEO Content', value: 'blog_content' }
        ]
      };
      
      return {
        agentId,
        content: 'Hi there! I\'m your Content Creator. I specialize in crafting compelling content that converts. Let\'s enhance your platform\'s messaging and user engagement.',
        type: 'interactive',
        interactive,
        confidence: 0.89
      };
    }
    
    if (agentId === 'tech-advisor') {
      const interactive: InteractiveMessage = {
        type: 'list',
        options: [
          { id: 'performance_audit', label: 'Performance Audit', value: 'performance_audit', description: 'Site speed and optimization review' },
          { id: 'security_review', label: 'Security Review', value: 'security_review', description: 'Vulnerability assessment' },
          { id: 'scalability_plan', label: 'Scalability Planning', value: 'scalability_plan', description: 'Future growth preparation' },
          { id: 'api_optimization', label: 'API Optimization', value: 'api_optimization', description: 'Backend efficiency improvements' },
          { id: 'mobile_optimization', label: 'Mobile Optimization', value: 'mobile_optimization', description: 'Mobile experience enhancement' }
        ]
      };
      
      return {
        agentId,
        content: 'Greetings! I\'m your Tech Advisor. I\'ll help optimize your platform\'s technical foundation. Here are the key areas I can assist with:',
        type: 'interactive',
        interactive,
        confidence: 0.94
      };
    }
    
    if (agentId === 'business-analyst') {
      const interactive: InteractiveMessage = {
        type: 'cards',
        cards: [
          {
            id: 'process_mapping',
            title: 'Process Mapping',
            description: 'Map current workflows and identify bottlenecks',
            badge: 'Foundation',
            actions: [
              { id: 'start_mapping', label: 'Start Mapping', value: 'start_mapping' },
              { id: 'view_templates', label: 'View Templates', value: 'view_templates' }
            ]
          },
          {
            id: 'kpi_dashboard',
            title: 'KPI Dashboard',
            description: 'Set up performance tracking and metrics',
            badge: 'Analytics',
            actions: [
              { id: 'define_kpis', label: 'Define KPIs', value: 'define_kpis' },
              { id: 'create_dashboard', label: 'Create Dashboard', value: 'create_dashboard' }
            ]
          },
          {
            id: 'roi_analysis',
            title: 'ROI Analysis',
            description: 'Calculate return on investment for improvements',
            badge: 'Strategic',
            actions: [
              { id: 'calculate_roi', label: 'Calculate ROI', value: 'calculate_roi' },
              { id: 'cost_benefit', label: 'Cost-Benefit Analysis', value: 'cost_benefit' }
            ]
          }
        ]
      };
      
      return {
        agentId,
        content: 'Hello! I\'m your Business Analyst. I focus on optimizing processes and measuring success. Let me help you identify opportunities for improvement:',
        type: 'interactive',
        interactive,
        confidence: 0.91
      };
    }
    
    return {
      agentId: 'orchestrator',
      content: 'I understand your request. Let me coordinate with the appropriate specialist to provide you with the best solution.',
      type: 'text',
      confidence: 0.85
    };
  };

  const handleUserMessage = (content: string) => {
    // Add user message
    addMessage({
      userId: 'user',
      content,
      type: 'text',
      editable: true
    });

    // Check for automatic handoff
    const targetAgent = automaticHandoff(content);
    
    if (targetAgent && targetAgent.id !== currentAgent.id) {
      // System handoff message
      setTimeout(() => {
        addMessage({
          type: 'system',
          content: `🔄 Routing to ${targetAgent.name} for specialized assistance`
        });
        
        setCurrentAgent(targetAgent);
        setContext(prev => ({
          ...prev,
          currentAgent: targetAgent.id,
          previousAgents: [...prev.previousAgents, currentAgent.id]
        }));
        
        // Agent introduction and response
        setTimeout(() => {
          const response = generateAgentResponse(targetAgent.id, content);
          addMessage(response);
        }, 800);
      }, 600);
    } else {
      // Current agent response
      setTimeout(() => {
        if (content.toLowerCase().includes('help') || content.toLowerCase().includes('options')) {
          const interactive: InteractiveMessage = {
            type: 'buttons',
            options: [
              { id: 'get_started', label: '🚀 Get Started', value: 'get_started' },
              { id: 'learn_more', label: '📚 Learn More', value: 'learn_more' },
              { id: 'see_examples', label: '💡 See Examples', value: 'see_examples' },
              { id: 'contact_team', label: '👥 Contact Team', value: 'contact_team' }
            ]
          };

          addMessage({
            agentId: currentAgent.id,
            content: 'Here are some quick actions to help you move forward:',
            type: 'interactive',
            interactive,
            confidence: 0.88
          });
        } else {
          const response = generateAgentResponse(currentAgent.id, content);
          addMessage(response);
        }
      }, 1000);
    }
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: newContent, edited: true }
          : msg
      )
    );
  };

  const handleInteractiveResponse = (response: string) => {
    addMessage({
      userId: 'user',
      content: response,
      type: 'text',
      editable: true
    });

    // Simulate detailed agent response to interactive selection
    setTimeout(() => {
      const responses = {
        'data_analysis': 'Excellent choice! I\'ll initiate a comprehensive data analysis. This will include customer behavior patterns, sales trends, and performance metrics. Expected completion: 15 minutes.',
        'ux_review': 'Perfect! Starting UX audit now. I\'ll analyze user flows, interface design, and accessibility. We\'ll identify pain points and improvement opportunities.',
        'customer_behavior': 'Analyzing customer behavior patterns... I\'ll examine user journeys, bounce rates, session duration, and conversion funnels across different segments.',
        'performance_audit': 'Initiating technical performance audit. I\'ll check page load speeds, server response times, database queries, and identify optimization opportunities.'
      };
      
      const responseText = responses[response as keyof typeof responses] || 
        `Great! I'm processing your request for "${response}". Let me gather the relevant information and provide you with actionable insights.`;
      
      addMessage({
        agentId: currentAgent.id,
        content: responseText,
        type: 'text',
        confidence: 0.93
      });
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        agentId: 'orchestrator',
        content: 'Hello! I\'m your AI Orchestrator. How can I help you today?',
        timestamp: new Date(),
        type: 'text',
        editable: false
      }
    ]);
    setCurrentAgent(agents[0]);
    setContext(prev => ({ ...prev, currentAgent: 'orchestrator', previousAgents: [] }));
  };

  const resetToOrchestrator = () => {
    const orchestrator = agents[0];
    setCurrentAgent(orchestrator);
    setContext(prev => ({
      ...prev,
      currentAgent: orchestrator.id,
      previousAgents: [...prev.previousAgents, currentAgent.id]
    }));
    addMessage({
      type: 'system',
      content: `🔄 Returning to ${orchestrator.name} for coordination`
    });
  };

  return (
    <SidebarProvider defaultOpen={false} className="min-h-svh">
      <Sidebar side="left" variant="floating" collapsible="icon" className="border-r" data-sidebar>
        <SidebarRail />
        <SidebarHeader className="p-2">
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent className="justify-between">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Home" 
                  size="lg"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'home' ? null : 'home')}
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Agents" 
                  size="lg"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'agents' ? null : 'agents')}
                >
                  <Users />
                  <span>Agents</span>
                  <SidebarMenuBadge>{agents.length}</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Analytics" 
                  size="lg"
                  onClick={() => setActiveSubmenu(activeSubmenu === 'analytics' ? null : 'analytics')}
                >
                  <BarChart3 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
            </SidebarMenu>
          </SidebarGroup>

          <SidebarFooter>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Settings" 
                    size="lg"
                    onClick={() => setActiveSubmenu(activeSubmenu === 'settings' ? null : 'settings')}
                  >
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="h-screen flex bg-background overflow-hidden">
          {/* Enhanced Sidebar - Fixed height with proper flex layout */}
          <div className="w-96 border-r bg-card flex flex-col shadow-lg h-full">
            {/* Conversation Metadata - Fixed height */}
            <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <ConversationMetadata context={context} currentTask={currentTask} />
            </div>

            {/* Current Agent - Fixed height */}
            <div className="flex-shrink-0 p-4 border-b">
              <h3 className="mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-tech-indigo" />
                Current Agent
              </h3>
              <AgentComponent
                agent={currentAgent}
                isActive={true}
                onClick={() => {}}
                workload={currentAgent.status === 'busy' ? 75 : 0}
              />
            </div>

            {/* Agent Team Header - Fixed height */}
            <div className="flex-shrink-0 p-4 pb-2 border-b">
              <h3 className="flex items-center gap-2">
                <Users className="w-4 h-4 text-tech-indigo" />
                Agent Team
              </h3>
            </div>

            {/* Scrollable Agent List - Takes remaining space */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4 pt-2 space-y-3">
                  {agents.filter(agent => agent.id !== currentAgent.id).map((agent) => (
                    <AgentComponent
                      key={agent.id}
                      agent={agent}
                      isActive={false}
                      onClick={() => {}}
                      workload={agent.status === 'busy' ? Math.floor(Math.random() * 60) + 20 : 0}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Control Actions - Fixed height */}
            <div className="flex-shrink-0 p-4 border-t space-y-2">
              <Button variant="outline" size="sm" onClick={resetToOrchestrator} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Return to Orchestrator
              </Button>
              <Button variant="outline" size="sm" onClick={clearChat} className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </div>

          {/* Main Chat Area - Fixed height with proper flex layout */}
          <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Enhanced Header - Fixed height */}
            <div className="flex-shrink-0 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-lg">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="min-w-0 flex-1">
                  <h1 className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    AI Agent Ecosystem
                  </h1>
                  <p className="text-white/80 text-sm truncate">
                    {context.title} • {messages.length} messages • Context: {context.id.slice(-6)}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {agents.filter(a => a.status === 'active').length} agents active
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Task: {currentTask.progress}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Messages - Takes remaining space with scroll */}
            <div className="flex-1 min-h-0 bg-gradient-to-b from-background to-muted/20">
              <ScrollArea className="h-full">
                <div className="max-w-6xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      agent={agents.find(a => a.id === message.agentId)}
                      onEdit={handleEditMessage}
                      onInteractiveResponse={handleInteractiveResponse}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Enhanced Chat Input - Fixed height */}
            <div className="flex-shrink-0">
              <ChatInput
                onSend={handleUserMessage}
                placeholder={`Collaborate with ${currentAgent.name}...`}
              />
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Custom Floating Submenu Panels */}
      {activeSubmenu && (
        <SubmenuPanel 
          activeSubmenu={activeSubmenu}
          agents={agents}
        />
      )}
          
    </SidebarProvider>
  )
}

export default App
