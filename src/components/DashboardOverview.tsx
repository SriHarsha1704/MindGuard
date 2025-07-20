import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoodTracker } from "@/components/MoodTracker";
import { StressInsights } from "@/components/StressInsights";
import { ProgressChart } from "@/components/ProgressChart";
import { DailyTasks } from "@/components/DailyTasks";

const DashboardOverview = () => {
  const [sleep, setSleep] = useState<string | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem('dashboardSleep');
    if (stored) setSleep(stored);
  }, []);
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-lg p-4 shadow-soft animate-fade-in">
          <div className="text-2xl font-bold text-primary">7.8</div>
          <div className="text-sm text-muted-foreground">Mood Score</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-soft animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="text-2xl font-bold text-success">2.1</div>
          <div className="text-sm text-muted-foreground">Stress Level</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="text-2xl font-bold text-accent">{sleep ? `${sleep}h` : "7.5h"}</div>
          <div className="text-sm text-muted-foreground">Sleep Last Night</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="text-2xl font-bold text-warning">3</div>
          <div className="text-sm text-muted-foreground">Active Interventions</div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-fade-in">
            <MoodTracker />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <ProgressChart />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <StressInsights />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <DailyTasks />
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-8 bg-card rounded-lg p-6 shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          AI Recommendations for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10 hover:shadow-glow transition-smooth">
            <div className="font-medium mb-2">Take a 10-minute walk</div>
            <div className="text-sm text-muted-foreground mb-3">
              Your stress levels are slightly elevated. A short walk can help reduce cortisol.
            </div>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-smooth">
              Start Activity
            </Button>
          </div>
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:shadow-glow transition-smooth">
            <div className="font-medium mb-2">Practice breathing</div>
            <div className="text-sm text-muted-foreground mb-3">
              Based on your pattern, a 5-minute breathing exercise would be beneficial.
            </div>
            <Button size="sm" variant="outline" className="border-accent/20 hover:bg-accent/5">
              Begin Session
            </Button>
          </div>
          <div className="bg-success/5 rounded-lg p-4 border border-success/10 hover:shadow-glow transition-smooth">
            <div className="font-medium mb-2">Hydration reminder</div>
            <div className="text-sm text-muted-foreground mb-3">
              You haven't logged water intake today. Stay hydrated for better mood.
            </div>
            <Button size="sm" variant="outline" className="border-success/20 hover:bg-success/5">
              Log Water
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;