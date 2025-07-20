import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/ProgressChart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [stressLevel, setStressLevel] = useState(3.2);
  const navigate = useNavigate();

  const stressGaugeColor = () => {
    if (stressLevel <= 3) return "bg-gradient-to-r from-success to-success/80";
    if (stressLevel <= 6) return "bg-gradient-to-r from-warning to-warning/80";
    return "bg-gradient-to-r from-destructive to-destructive/80";
  };

  const stressDescription = () => {
    if (stressLevel <= 3) return "Low - You're doing great! 😌";
    if (stressLevel <= 6) return "Moderate - Watch for patterns 😰";
    return "High - Consider stress management 😵";
  };

  const insights = [
    {
      title: "Sleep Pattern",
      value: "7.2 hrs avg",
      trend: "+15%",
      positive: true,
      description: "Your sleep quality improved this week"
    },
    {
      title: "Stress Triggers",
      value: "Work overload",
      trend: "Peak at 3PM",
      positive: false,
      description: "Afternoon meetings correlate with stress spikes"
    },
    {
      title: "Recovery Time",
      value: "45 mins",
      trend: "-12%",
      positive: true,
      description: "Faster bounce-back from stressful events"
    },
    {
      title: "Mood Stability",
      value: "Good",
      trend: "Consistent",
      positive: true,
      description: "Mood fluctuations within healthy range"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>← Back to Dashboard</Button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Deep insights into your wellness patterns</p>
        </div>
        <div className="flex space-x-2">
          {["7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="transition-smooth"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Live Stress Gauge */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Live Stress Level</span>
            <Badge className="bg-primary/10 text-primary animate-pulse-soft">LIVE</Badge>
          </CardTitle>
          <CardDescription>Real-time stress prediction based on your patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative">
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${stressGaugeColor()}`}
                  style={{ width: `${(stressLevel / 10) * 100}%` }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Relaxed</span>
                <span className="font-bold text-foreground">{stressLevel}/10</span>
                <span>Stressed</span>
              </div>
            </div>
            <p className="text-center text-lg font-medium">{stressDescription()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends" className="transition-smooth">Trends</TabsTrigger>
          <TabsTrigger value="patterns" className="transition-smooth">Patterns</TabsTrigger>
          <TabsTrigger value="correlations" className="transition-smooth">Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Wellness Trends</CardTitle>
                <CardDescription>Your progress over the last {timeRange}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Stress Patterns</CardTitle>
                <CardDescription>Daily stress level fluctuations</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse-soft">📊</div>
                  <p>Stress pattern chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="animate-fade-in">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Weekly Patterns</CardTitle>
              <CardDescription>Discover your weekly wellness rhythms</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse-soft">🔄</div>
                <p>Weekly pattern analysis will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="animate-fade-in">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Factor Correlations</CardTitle>
              <CardDescription>How different factors affect your wellness</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse-soft">🔗</div>
                <p>Correlation analysis will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Insights Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          AI-Powered Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <Card 
              key={insight.title} 
              className="shadow-soft hover:shadow-glow transition-smooth group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">{insight.title}</h3>
                  <div className="text-xl font-bold">{insight.value}</div>
                  <div className={`text-sm flex items-center space-x-1 ${
                    insight.positive ? "text-success" : "text-warning"
                  }`}>
                    <span>{insight.positive ? "↗️" : "⚠️"}</span>
                    <span>{insight.trend}</span>
                  </div>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-smooth">
                    {insight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;