import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    activityLevel: "",
    weightGoal: "",
    targetActivityMinutes: ""
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Store questionnaire data
      localStorage.setItem('userMetrics', JSON.stringify(formData));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What's your height?</h3>
              <p className="text-muted-foreground">This helps us calculate your BMI</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 175"
                value={formData.height}
                onChange={(e) => updateFormData('height', e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What's your current weight?</h3>
              <p className="text-muted-foreground">We'll track your progress from here</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={formData.weight}
                onChange={(e) => updateFormData('weight', e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">How active are you?</h3>
              <p className="text-muted-foreground">This affects your calorie needs</p>
            </div>
            <Select value={formData.activityLevel} onValueChange={(value) => updateFormData('activityLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (desk job, no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="extra">Extra active (very hard exercise, physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What's your weight goal?</h3>
              <p className="text-muted-foreground">Target weight you want to achieve</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightGoal">Target Weight (kg)</Label>
              <Input
                id="weightGoal"
                type="number"
                placeholder="e.g., 65"
                value={formData.weightGoal}
                onChange={(e) => updateFormData('weightGoal', e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Daily activity goal</h3>
              <p className="text-muted-foreground">How many minutes of activity per day?</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetActivityMinutes">Minutes per day</Label>
              <Input
                id="targetActivityMinutes"
                type="number"
                placeholder="e.g., 30"
                value={formData.targetActivityMinutes}
                onChange={(e) => updateFormData('targetActivityMinutes', e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-card/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's set you up
          </CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {step === totalSteps ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questionnaire;