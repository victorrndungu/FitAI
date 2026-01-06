import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalorieRing from "@/components/CalorieRing";
import WeightChart from "@/components/WeightChart";
import BottomNavigation from "@/components/BottomNavigation";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from state/API
  const caloriesConsumed = 1200;
  const caloriesTarget = 1800;
  const caloriesBurned = 300;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 pt-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/notifications')}
          className="rounded-full hover:bg-primary/10"
        >
          <Bell className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          FitTracker
        </h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/profile')}
          className="rounded-full hover:bg-primary/10"
        >
          <User className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-4 space-y-6">
        {/* Welcome Message */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Let's crush your goals today 💪</p>
        </div>

        {/* Calorie Ring */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center">Daily Calories</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CalorieRing 
              consumed={caloriesConsumed}
              target={caloriesTarget}
              burned={caloriesBurned}
            />
          </CardContent>
        </Card>

        {/* Weight Progress Chart */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <WeightChart />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">2.3kg</div>
              <div className="text-sm text-muted-foreground">Lost</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;