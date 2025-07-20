import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const moodOptions = [
  { emoji: "😌", label: "Calm", value: 8, color: "accent" },
  { emoji: "😊", label: "Happy", value: 9, color: "success" },
  { emoji: "😐", label: "Neutral", value: 5, color: "muted" },
  { emoji: "😟", label: "Worried", value: 3, color: "warning" },
  { emoji: "😢", label: "Sad", value: 2, color: "destructive" },
];

const stressLevels = [
  { level: "Low", value: 2, color: "success" },
  { level: "Moderate", value: 5, color: "warning" },
  { level: "High", value: 8, color: "destructive" },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedStress, setSelectedStress] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood !== null && selectedStress !== null) {
      setIsSubmitted(true);
      // Here you would typically save to database
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-primary">Daily Check-In</CardTitle>
        <CardDescription>
          How are you feeling today? Your input helps us provide better support.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Current Mood</h4>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                className="h-16 flex-col gap-1 transition-smooth"
                onClick={() => setSelectedMood(mood.value)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Stress Level</h4>
          <div className="grid grid-cols-3 gap-3">
            {stressLevels.map((stress) => (
              <Button
                key={stress.value}
                variant={selectedStress === stress.value ? "default" : "outline"}
                className="h-12 transition-smooth"
                onClick={() => setSelectedStress(stress.value)}
              >
                {stress.level}
              </Button>
            ))}
          </div>
        </div>

        {selectedMood !== null && selectedStress !== null && (
          <div className="pt-4 border-t">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
              disabled={isSubmitted}
            >
              {isSubmitted ? "✓ Logged Successfully" : "Log Today's Check-In"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}