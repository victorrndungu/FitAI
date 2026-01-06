import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Activity = () => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const activities = [
    { name: "Running", duration: "30 min", calories: 300, icon: "🏃‍♀️" },
    { name: "Walking", duration: "45 min", calories: 180, icon: "🚶‍♀️" },
    { name: "Cycling", duration: "60 min", calories: 450, icon: "🚴‍♀️" },
    { name: "Yoga", duration: "25 min", calories: 120, icon: "🧘‍♀️" }
  ];

  const dailyGoal = 30; // minutes
  const currentProgress = 15; // minutes
  const progressPercentage = (currentProgress / dailyGoal) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
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
        <h1 className="text-xl font-bold ml-4">Activity Tracking</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Daily Goal Progress */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Daily Activity Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-primary">{currentProgress}</div>
              <div className="text-sm text-muted-foreground">of {dailyGoal} minutes</div>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="text-center text-sm text-muted-foreground">
              {dailyGoal - currentProgress} minutes remaining
            </div>
          </CardContent>
        </Card>

        {/* Active Tracker */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">{formatTime(elapsedTime)}</div>
            <div className="text-muted-foreground mb-4">Current Activity</div>
            <div className="flex justify-center gap-3">
              <Button
                onClick={() => setIsTracking(!isTracking)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isTracking ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isTracking ? 'Pause' : 'Start'}
              </Button>
              <Button variant="outline" onClick={() => setElapsedTime(0)}>
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Activities */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Quick Start</h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Custom
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {activities.map((activity, index) => (
              <Card key={index} className="shadow-lg border-0 bg-card/80 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{activity.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{activity.name}</h3>
                  <p className="text-xs text-muted-foreground">{activity.calories} cal/{activity.duration}</p>
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    Start
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Summary */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Today's Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span>Morning Walk</span>
                <span className="text-sm text-muted-foreground">15 min • 90 cal</span>
              </div>
              <div className="text-center text-muted-foreground py-4">
                No other activities logged today
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activity;