import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { InteractiveMessage, InteractiveOption, InteractiveCard } from "../types";

interface InteractiveMessageProps {
  interactive: InteractiveMessage;
  onResponse: (response: string) => void;
}

export function InteractiveMessageComponent({ interactive, onResponse }: InteractiveMessageProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleButtonClick = (option: InteractiveOption) => {
    onResponse(option.value);
    if (option.action) {
      option.action();
    }
  };

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
    onResponse(value);
  };

  if (interactive.type === 'buttons' && interactive.options) {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {interactive.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            onClick={() => handleButtonClick(option)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    );
  }

  if (interactive.type === 'dropdown' && interactive.options) {
    return (
      <div className="mt-2">
        <Select onValueChange={handleDropdownChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={interactive.prompt || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {interactive.options.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (interactive.type === 'cards' && interactive.cards) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        {interactive.cards.map((card) => (
          <Card key={card.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                {card.actions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleButtonClick(action)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (interactive.type === 'list' && interactive.options) {
    return (
      <div className="mt-2 space-y-1">
        {interactive.options.map((option) => (
          <div
            key={option.id}
            className="p-2 rounded hover:bg-accent cursor-pointer transition-colors"
            onClick={() => handleButtonClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  }

  return null;
}