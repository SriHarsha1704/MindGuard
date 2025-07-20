import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    title: "Sleep Quality",
    value: 75,
    trend: "up",
    description: "7.5 hours average",
    color: "success"
  },
  {
    title: "Activity Level",
    value: 60,
    trend: "stable",
    description: "4 activities this week",
    color: "primary"
  },
  {
    title: "Social Connections",
    value: 45,
    trend: "down",
    description: "Consider reaching out",
    color: "warning"
  }
];

const recommendations = [
  {
    type: "breathing",
    title: "5-Minute Breathing Exercise",
    description: "Take a moment to practice deep breathing",
    urgency: "low"
  },
  {
    type: "walk",
    title: "Short Walk",
    description: "A 10-minute walk can boost your mood",
    urgency: "medium"
  },
  {
    type: "connect",
    title: "Connect with Someone",
    description: "Reach out to a friend or family member",
    urgency: "medium"
  }
];

export function StressInsights() {
  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">Wellness Insights</CardTitle>
          <CardDescription>
            Your patterns over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.title} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{insight.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {insight.description}
                    </span>
                    <Badge 
                      variant={insight.trend === "up" ? "default" : insight.trend === "down" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {insight.trend === "up" ? "↗" : insight.trend === "down" ? "↘" : "→"}
                    </Badge>
                  </div>
                </div>
                <Progress value={insight.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">Personalized Recommendations</CardTitle>
          <CardDescription>
            Based on your current patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border bg-gradient-calm hover:shadow-soft transition-smooth cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rec.description}
                    </p>
                  </div>
                  <Badge 
                    variant={rec.urgency === "high" ? "destructive" : rec.urgency === "medium" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {rec.urgency}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}