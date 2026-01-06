import { useNavigate, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, MessageCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: UtensilsCrossed, label: "Log Food", path: "/log-food" },
    { icon: MessageCircle, label: "Chatbot", path: "/chatbot" },
    { icon: Activity, label: "Activity", path: "/activity" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border/50 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;