import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wellness.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">MindGuard</div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              AI-Powered Mental Wellness
            </Badge>
            <h1 className="text-5xl font-bold leading-tight">
              Prevent Stress Before It
              <span className="text-primary block animate-pulse-soft">
                Takes Over
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your intelligent companion for mental wellness. Track patterns, predict stress, 
              and receive personalized interventions to maintain optimal mental health.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5 transition-smooth"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage}
              alt="Mental wellness illustration"
              className="relative z-10 rounded-3xl shadow-soft w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Your Mental Health, <span className="text-primary">Reimagined</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology meets compassionate care to provide you with 
            the support you need, when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-soft hover:shadow-glow transition-smooth group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:animate-float">
                <span className="text-white text-xl">🧠</span>
              </div>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>
                Advanced machine learning algorithms analyze your patterns to predict 
                stress levels before they become overwhelming.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:animate-float">
                <span className="text-white text-xl">🎯</span>
              </div>
              <CardTitle>Personalized Interventions</CardTitle>
              <CardDescription>
                Receive tailored recommendations based on your unique lifestyle, 
                preferences, and stress patterns for maximum effectiveness.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:animate-float">
                <span className="text-white text-xl">🔒</span>
              </div>
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Your mental health data is encrypted and stored securely. 
                You maintain complete control over what you share.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">92%</div>
              <div className="text-muted-foreground">Stress Reduction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15k+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">AI Monitoring</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Privacy Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your
            <span className="text-primary block">Mental Wellness?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who have already taken control of their mental health 
            with our AI-powered platform.
          </p>
          <Link to="/signup">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
            >
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 MindGuard. Your mental wellness, our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;