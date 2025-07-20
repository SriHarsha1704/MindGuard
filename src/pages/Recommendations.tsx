import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [completedActions, setCompletedActions] = useState<Set<number>>(new Set());
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise",
      category: "Stress Relief",
      priority: "High",
      icon: "🫁",
      description: "Calm your nervous system with deep breathing",
      whyItHelps: "Deep breathing activates your parasympathetic nervous system, reducing cortisol levels and promoting relaxation. Studies show it can lower stress by 23% in just 5 minutes.",
      estimatedTime: "5 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "10-Minute Walk Outside",
      category: "Physical Activity",
      priority: "Medium",
      icon: "🚶‍♂️",
      description: "Get some fresh air and light movement",
      whyItHelps: "Walking outdoors increases endorphin production and vitamin D absorption. Nature exposure reduces rumination and negative thought patterns by up to 90%.",
      estimatedTime: "10 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Gratitude Journaling",
      category: "Mindfulness",
      priority: "Low",
      icon: "📝",
      description: "Write down 3 things you're grateful for",
      whyItHelps: "Gratitude practice rewires your brain for positivity, increasing serotonin and dopamine. Regular practice improves mood and life satisfaction by 25%.",
      estimatedTime: "3 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Progressive Muscle Relaxation",
      category: "Stress Relief",
      priority: "Medium",
      icon: "💪",
      description: "Release physical tension systematically",
      whyItHelps: "PMR helps identify and release muscle tension, reducing physical stress symptoms. It's proven to lower anxiety and improve sleep quality.",
      estimatedTime: "15 min",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Hydration Check",
      category: "Self-Care",
      priority: "High",
      icon: "💧",
      description: "Drink a glass of water mindfully",
      whyItHelps: "Dehydration affects mood and cognitive function. Proper hydration supports neurotransmitter production and reduces fatigue by 42%.",
      estimatedTime: "2 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Social Connection",
      category: "Social",
      priority: "Medium",
      icon: "💬",
      description: "Reach out to a friend or family member",
      whyItHelps: "Social connection releases oxytocin, reducing stress hormones. Strong relationships are the #1 predictor of happiness and longevity.",
      estimatedTime: "10 min",
      difficulty: "Easy"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted";
    }
  };

  const handleTryAction = (id: number) => {
    setCompletedActions(prev => new Set([...prev, id]));
    toast({
      title: "Great job! 🎉",
      description: "Activity marked as completed. Your progress has been updated.",
    });
  };

  const toggleCard = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>← Back to Dashboard</Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-primary">Personalized Recommendations</h1>
        <p className="text-muted-foreground">AI-curated activities to improve your wellness</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completedActions.size}</div>
            <div className="text-sm text-muted-foreground">Completed Today</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">3</div>
            <div className="text-sm text-muted-foreground">Streak Days</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">24</div>
            <div className="text-sm text-muted-foreground">Total Activities</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">85%</div>
            <div className="text-sm text-muted-foreground">Wellness Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="relative group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card 
              className={`shadow-soft hover:shadow-glow transition-all duration-500 cursor-pointer h-full transform-gpu ${
                flippedCards.has(rec.id) ? 'rotate-y-180' : ''
              } ${completedActions.has(rec.id) ? 'opacity-75 scale-95' : 'hover:scale-[1.02]'}`}
              onClick={() => toggleCard(rec.id)}
            >
              {/* Front of card */}
              <div className={`${flippedCards.has(rec.id) ? 'hidden' : 'block'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="text-3xl">{rec.icon}</div>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{rec.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{rec.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="font-medium">{rec.difficulty}</span>
                    </div>
                    
                    {!completedActions.has(rec.id) ? (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTryAction(rec.id);
                        }}
                        className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                        size="sm"
                      >
                        Try This Activity
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 py-2 bg-success/10 rounded-md">
                        <span className="text-success text-lg">✓</span>
                        <span className="text-success font-medium">Completed!</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground text-center">
                      Click card to learn why this helps
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Back of card */}
              <div className={`${flippedCards.has(rec.id) ? 'block' : 'hidden'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>💡</span>
                    <span>Why This Helps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed">{rec.whyItHelps}</p>
                    
                    <div className="text-xs text-muted-foreground text-center">
                      Click to flip back
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Achievement Banner */}
      {completedActions.size >= 3 && (
        <Card className="shadow-glow bg-gradient-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-primary mb-2">Amazing Progress!</h3>
            <p className="text-muted-foreground">
              You've completed {completedActions.size} wellness activities today. Keep up the great work!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Recommendations;