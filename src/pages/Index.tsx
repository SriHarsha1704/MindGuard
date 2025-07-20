import { MoodTracker } from "@/components/MoodTracker";
import { StressInsights } from "@/components/StressInsights";
import { ProgressChart } from "@/components/ProgressChart";
import { DailyTasks } from "@/components/DailyTasks";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/20" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                Mental Wellness Companion
              </h1>
              <p className="text-xl opacity-90 animate-fade-in">
                Your AI-powered tool for stress prevention and mental health monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MoodTracker />
            <ProgressChart />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <StressInsights />
            <DailyTasks />
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg bg-card shadow-soft">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🧠</span>
            </div>
            <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms analyze your patterns to predict stress and provide personalized recommendations.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card shadow-soft">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Your mental health data is encrypted and stored securely. You control what you share.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card shadow-soft">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">📈</span>
            </div>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your mental wellness journey with detailed analytics and trend insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
