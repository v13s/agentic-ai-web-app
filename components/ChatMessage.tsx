import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Edit, Check, X, User, Bot } from "lucide-react";
import { InteractiveMessageComponent } from "./InteractiveMessage";
import { Message, Agent } from "../types";

interface ChatMessageProps {
  message: Message;
  agent?: Agent;
  onEdit?: (messageId: string, newContent: string) => void;
  onInteractiveResponse?: (response: string) => void;
}

export function ChatMessage({ message, agent, onEdit, onInteractiveResponse }: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(message.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const isUserMessage = !!message.userId;
  const isSystemMessage = message.type === 'system';

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-4">
        <Badge variant="secondary" className="px-3 py-1">
          {message.content}
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 p-4 ${isUserMessage ? 'flex-row-reverse' : ''}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        {isUserMessage ? (
          <>
            <AvatarImage src="/user-avatar.png" alt="User" />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src={agent?.avatar} alt={agent?.name} />
            <AvatarFallback style={{ backgroundColor: agent?.color }}>
              {agent ? agent.name.substring(0, 2).toUpperCase() : <Bot className="w-4 h-4" />}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div className={`flex-1 max-w-[80%] ${isUserMessage ? 'text-right' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {isUserMessage ? 'You' : agent?.name || 'AI Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
          {message.edited && (
            <Badge variant="outline" className="text-xs">
              Edited
            </Badge>
          )}
        </div>
        
        <div className={`rounded-lg p-3 ${
          isUserMessage 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted'
        }`}>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[60px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.interactive && onInteractiveResponse && (
                <InteractiveMessageComponent
                  interactive={message.interactive}
                  onResponse={onInteractiveResponse}
                />
              )}
            </>
          )}
        </div>
        
        {message.editable && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 h-6 px-2"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}