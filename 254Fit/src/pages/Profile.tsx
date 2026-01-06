import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "January 2024"
  };

  const stats = [
    { label: "Current Weight", value: "68 kg" },
    { label: "Goal Weight", value: "65 kg" },
    { label: "Height", value: "175 cm" },
    { label: "Activity Level", value: "Moderate" }
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
        <h1 className="text-xl font-bold ml-4">Profile</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* User Info */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 bg-gradient-to-br from-primary to-secondary">
                <AvatarFallback className="text-white font-bold text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <div className="space-y-3">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-start p-4 h-auto">
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4 h-auto text-destructive hover:text-destructive"
                onClick={() => navigate('/signup')}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign Out</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;