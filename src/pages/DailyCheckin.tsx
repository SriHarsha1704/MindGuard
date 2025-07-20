import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DailyCheckin = () => {
  const [formData, setFormData] = useState({
    sleep: [7],
    mood: [5],
    stress: [3],
    energy: [6],
    workHours: "",
    exercise: "",
    socialInteractions: [3],
    notes: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const getMoodEmoji = (value: number) => {
    const emojis = ["😢", "😟", "😐", "🙂", "😊", "😄", "🤩", "🥳", "🌟", "✨"];
    return emojis[Math.min(value - 1, 9)] || "😐";
  };

  const getStressColor = (value: number) => {
    if (value <= 3) return "text-success";
    if (value <= 6) return "text-warning";
    return "text-destructive";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Daily check-in saved! 🎉",
      description: "Your wellness data has been recorded successfully.",
    });
    // Save feedback/notes to localStorage for dashboard alert
    if (formData.notes && formData.notes.trim()) {
      localStorage.setItem('dashboardFeedback', formData.notes.trim());
    }
    // Save sleep value to localStorage for dashboard
    if (formData.sleep && formData.sleep.length > 0) {
      localStorage.setItem('dashboardSleep', String(formData.sleep[0]));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>← Back to Dashboard</Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-primary">Daily Check-in</h1>
        <p className="text-muted-foreground">Track your daily wellness metrics</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood & Stress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>How's your mood?</span>
                <span className="text-3xl animate-pulse-soft">
                  {getMoodEmoji(formData.mood[0])}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={formData.mood}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Terrible</span>
                  <span className="font-medium text-foreground">{formData.mood[0]}/10</span>
                  <span>Amazing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${getStressColor(formData.stress[0])}`}>
                <span>Stress Level</span>
                <span className="text-2xl">
                  {formData.stress[0] <= 3 ? "😌" : formData.stress[0] <= 6 ? "😰" : "😵"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={formData.stress}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, stress: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Very Relaxed</span>
                  <span className={`font-medium ${getStressColor(formData.stress[0])}`}>
                    {formData.stress[0]}/10
                  </span>
                  <span>Overwhelmed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sleep & Energy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Sleep Quality</span>
                <span className="text-2xl">😴</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={formData.sleep}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, sleep: value }))}
                  max={12}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span className="font-medium text-foreground">{formData.sleep[0]} hours</span>
                  <span>Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Energy Level</span>
                <span className="text-2xl">⚡</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={formData.energy}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, energy: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Exhausted</span>
                  <span className="font-medium text-foreground">{formData.energy[0]}/10</span>
                  <span>Energized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Work Hours</span>
                <span className="text-xl">💼</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                placeholder="8"
                value={formData.workHours}
                onChange={(e) => setFormData(prev => ({ ...prev, workHours: e.target.value }))}
                className="transition-smooth focus:shadow-glow"
              />
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Exercise (min)</span>
                <span className="text-xl">🏃‍♂️</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                placeholder="30"
                value={formData.exercise}
                onChange={(e) => setFormData(prev => ({ ...prev, exercise: e.target.value }))}
                className="transition-smooth focus:shadow-glow"
              />
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Social Time</span>
                <span className="text-xl">👥</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={formData.socialInteractions}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, socialInteractions: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="font-medium text-foreground">{formData.socialInteractions[0]}/10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="shadow-soft hover:shadow-glow transition-smooth">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Anything specific about your day?</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="How are you feeling today? Any specific events or thoughts..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-smooth focus:shadow-glow resize-none"
            />
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full lg:w-auto bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
          size="lg"
        >
          Save Daily Check-in ✨
        </Button>
      </form>
    </div>
  );
};

export default DailyCheckin;