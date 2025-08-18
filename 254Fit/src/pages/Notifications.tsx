import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Notifications = () => {
  const navigate = useNavigate();
  
  const notifications = [
    {
      id: 1,
      type: "achievement",
      icon: Target,
      title: "Goal Reached!",
      message: "You hit your daily calorie goal!",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "reminder",
      icon: Bell,
      title: "Time to log your lunch",
      message: "Don't forget to track your meal",
      time: "4 hours ago",
      read: false
    },
    {
      id: 3,
      type: "progress",
      icon: TrendingUp,
      title: "Weekly Progress",
      message: "You lost 0.5kg this week! Keep it up!",
      time: "1 day ago",
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="flex items-center p-4 pt-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-primary/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Notifications</h1>
      </div>

      <div className="px-4 space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`shadow-lg border-0 bg-card/80 backdrop-blur ${
                !notification.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'achievement' ? 'bg-primary/10 text-primary' :
                    notification.type === 'progress' ? 'bg-secondary/10 text-secondary' :
                    'bg-muted/50 text-muted-foreground'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-muted-foreground text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;