import React from 'react';
import { Users, Calendar, ClipboardList, Stethoscope } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = ({ currentView, onViewChange }) => {
  const navItems = [
    { 
      id: 'patients', 
      label: 'Pacjenci', 
      icon: Users
    },
    { 
      id: 'appointments', 
      label: 'Wizyty', 
      icon: ClipboardList
    },
    { 
      id: 'calendar', 
      label: 'Kalendarz', 
      icon: Calendar
    },
    { 
      id: 'procedures', 
      label: 'Zabiegi', 
      icon: Stethoscope
    }
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container">
        <div className="flex space-x-8">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={cn(
                  "flex items-center space-x-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors",
                  currentView === item.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;