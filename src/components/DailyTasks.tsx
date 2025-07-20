import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function DailyTasks() {
  const [sleepHours, setSleepHours] = useState([7]);
  const [workHours, setWorkHours] = useState([8]);
  const [exercises, setExercises] = useState("");
  const [socialInteractions, setSocialInteractions] = useState([3]);

  const handleSubmit = () => {
    const data = {
      sleep: sleepHours[0],
      work: workHours[0],
      exercises,
      social: socialInteractions[0],
      timestamp: new Date().toISOString()
    };
    
    console.log("Daily data:", data);
    // Here you would save to your backend/database
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-primary">Daily Data Entry</CardTitle>
        <CardDescription>
          Track your daily activities to help us understand your patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sleep">Hours of Sleep: {sleepHours[0]} hours</Label>
          <Slider
            id="sleep"
            min={4}
            max={12}
            step={0.5}
            value={sleepHours}
            onValueChange={setSleepHours}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="work">Work Hours Today: {workHours[0]} hours</Label>
          <Slider
            id="work"
            min={0}
            max={16}
            step={0.5}
            value={workHours}
            onValueChange={setWorkHours}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exercise">Physical Activities</Label>
          <Input
            id="exercise"
            placeholder="e.g., 30min walk, yoga, gym..."
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social">Social Interactions: {socialInteractions[0]}</Label>
          <Slider
            id="social"
            min={0}
            max={10}
            step={1}
            value={socialInteractions}
            onValueChange={setSocialInteractions}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None</span>
            <span>Very Social</span>
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          Save Today's Data
        </Button>
      </CardContent>
    </Card>
  );
}