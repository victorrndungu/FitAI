import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const LogFood = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const recentFoods = [
    { name: "Chicken Breast", calories: 165, portion: "100g" },
    { name: "Brown Rice", calories: 123, portion: "100g" },
    { name: "Broccoli", calories: 25, portion: "100g" },
    { name: "Greek Yogurt", calories: 59, portion: "100g" }
  ];

  const filteredFoods = recentFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-xl font-bold ml-4">Log Food</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Add */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Plus className="h-5 w-5 mr-2" />
              Add Custom Food
            </Button>
          </CardContent>
        </Card>

        {/* Recent/Searched Foods */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {searchTerm ? 'Search Results' : 'Recent Foods'}
          </h2>
          <div className="space-y-3">
            {filteredFoods.map((food, index) => (
              <Card key={index} className="shadow-lg border-0 bg-card/80 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {food.calories} cal per {food.portion}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFoods.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No foods found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogFood;