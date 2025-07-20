import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoodTracker } from "@/components/MoodTracker";
import { StressInsights } from "@/components/StressInsights";
import { ProgressChart } from "@/components/ProgressChart";
import { DailyTasks } from "@/components/DailyTasks";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import DailyCheckin from "./DailyCheckin";
import Analytics from "./Analytics";
import Recommendations from "./Recommendations";
import Settings from "./Settings";
import DashboardOverview from "@/components/DashboardOverview";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const dashboardItems = [
  { title: "Overview", url: "/dashboard", icon: "🏠" },
  { title: "Daily Check-in", url: "/dashboard/checkin", icon: "📝" },
  { title: "Analytics", url: "/dashboard/analytics", icon: "📊" },
  { title: "Recommendations", url: "/dashboard/recommendations", icon: "💡" },
  { title: "Settings", url: "/dashboard/settings", icon: "⚙️" },
];

const MessageIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-red-500">
    <path d="M6.5 2a1 1 0 0 0-1 1V4H3a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2h-2.5V3a1 1 0 0 0-1-1h-5zm7 4H6.5V3h7v3zM5 7v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7H5zm2 2a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V9zm4 0a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V9z"/>
  </svg>
);

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  return (
    <Sidebar className="border-r bg-card/50">
      <SidebarContent>
        {/* User Profile */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gradient-primary text-white">{user.firstName?.[0] || 'J'}{user.lastName?.[0] || 'D'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth ${
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your wellness assistant. Ask me anything about mental health, stress, or wellness!" }
  ]);
  const [input, setInput] = useState("");
  const [reports, setReports] = useState(() => {
    const stored = localStorage.getItem('reports');
    return stored ? JSON.parse(stored) : [];
  });
  const fileInputRef = useRef(null);
  const [feedback, setFeedback] = useState(() => localStorage.getItem('dashboardFeedback') || "");
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const name = user.firstName || "John";
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 18) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  // Basic health Q&A logic
  const handleSend = () => {
    if (!input.trim()) return;
  
    const userMsg = { from: "user", text: input };
    const responses = [];
  
    if (/stress|anxious|anxiety/i.test(input)) {
      responses.push("Try deep breathing, journaling, or a quick walk outside to lower stress.");
    }
    if (/sleep|insomnia|tired/i.test(input)) {
      responses.push("Stick to a regular sleep schedule and wind down with relaxing activities before bed.");
    }
    if (/diet|food|nutrition|eat/i.test(input)) {
      responses.push("Fuel your body with balanced meals: veggies, fruits, protein, and stay hydrated!");
    }
    if (/exercise|workout|activity|fitness/i.test(input)) {
      responses.push("A daily walk or short workout can lift your mood and energy.");
    }
    if (/sad|depressed|down|unhappy/i.test(input)) {
      responses.push("It's okay to feel low sometimes. Reach out to a trusted friend or professional if needed.");
    }
    if (/burnout|exhausted|overwork/i.test(input)) {
      responses.push("Take regular breaks, set boundaries, and rest when needed to prevent burnout.");
    }
    if (/motivation|lazy|procrastinate/i.test(input)) {
      responses.push("Break tasks into small steps and reward yourself for progress!");
    }
    if (/hydration|water|drink/i.test(input)) {
      responses.push("Drink enough water — aim for 6–8 glasses daily!");
    }
    if (/headache|migraine/i.test(input)) {
      responses.push("Rest your eyes, stay hydrated, and manage stress to ease headaches.");
    }
    if (/screen|blue light/i.test(input)) {
      responses.push("Take screen breaks every 20 minutes to protect your eyes and mind.");
    }
    if (/lonely|alone/i.test(input)) {
      responses.push("Connect with a friend or family member. Even a short chat helps.");
    }
    if (/mindful|meditation|breathe/i.test(input)) {
      responses.push("Try a 5-minute mindfulness exercise to calm your mind.");
    }
    if (/focus|concentrate/i.test(input)) {
      responses.push("Work in short bursts, remove distractions, and take regular breaks to stay sharp.");
    }
    if (/panic|overwhelm/i.test(input)) {
      responses.push("Pause, breathe slowly, and remind yourself that this feeling will pass.");
    }
    if (/gratitude|thankful/i.test(input)) {
      responses.push("Try writing down 3 things you're grateful for today.");
    }
    if (/productivity|work/i.test(input)) {
      responses.push("Prioritize important tasks and give yourself breaks to stay productive.");
    }
    if (/overthink|worry/i.test(input)) {
      responses.push("Try grounding techniques: name things you see, hear, feel — it can help calm overthinking.");
    }
    if (/relationship|friend|family/i.test(input)) {
      responses.push("Healthy communication is key. Express how you feel calmly and honestly.");
    }
    if (/self-care|pamper/i.test(input)) {
      responses.push("Take time for yourself: read, rest, or do something you enjoy.");
    }
    if (/anger|angry/i.test(input)) {
      responses.push("Pause and breathe deeply. Step away and return when you feel calmer.");
    }
  
   
    if (responses.length === 0) {
      responses.push("I'm here for you. Could you tell me a bit more about how you're feeling?");
    }
  
    const botMsg = { from: "bot", text: responses.join(" ") };
  
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  };
  
  const handleReportUpload = (e) => {
    const files = Array.from(e.target.files as FileList);
    const newReports = files.map((file: File) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    const updated = [...reports, ...newReports];
    setReports(updated);
    localStorage.setItem('reports', JSON.stringify(updated));
  };

  const handleDeleteReport = (idx) => {
    const updated = reports.filter((_, i) => i !== idx);
    setReports(updated);
    localStorage.setItem('reports', JSON.stringify(updated));
  };

  const handleDismissFeedback = () => {
    setFeedback("");
    localStorage.removeItem('dashboardFeedback');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-calm">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-card/50 border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">
                  {getGreeting()} 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your wellness overview for today
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-success/10 text-success border-success/20">
                Stress Level: Low
              </Badge>
              <Button variant="outline" size="sm">
                Emergency Support
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6">
            {feedback && (
              <div className="mb-6 p-4 bg-warning/10 border-l-4 border-warning rounded flex items-center justify-between">
                <div className="text-warning font-medium flex-1">
                  <span className="mr-2">📝</span>Feedback from your last check-in: {feedback}
                </div>
                <button
                  onClick={handleDismissFeedback}
                  className="ml-4 px-2 py-1 text-warning hover:text-warning/80 rounded focus:outline-none focus:ring-2 focus:ring-warning"
                  aria-label="Dismiss feedback alert"
                >
                  ✕
                </button>
              </div>
            )}
            <Routes>
              <Route path="/" element={
                <>
                  <DashboardOverview />
                  {/* Attach Reports Section */}
                  <div className="mt-8 p-6 bg-card rounded-lg shadow-soft">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span role="img" aria-label="attach">📎</span> Attach Your Reports
                    </h2>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleReportUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="mb-4"
                    >
                      Upload Reports
                    </Button>
                    {reports.length > 0 ? (
                      <ul className="space-y-2">
                        {reports.map((report, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <a href={report.url} download={report.name} className="text-primary underline">
                              {report.name}
                            </a>
                            <button
                              type="button"
                              className="ml-2 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                              onClick={() => handleDeleteReport(idx)}
                              aria-label="Delete report"
                            >
                              <TrashIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No reports attached yet.</p>
                    )}
                  </div>
                </>
              } />
              <Route path="/checkin" element={<DailyCheckin />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          {/* Chatbot Floating Button and Dialog */}
          <Dialog open={chatOpen} onOpenChange={setChatOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full bg-primary text-white hover:bg-primary/90"
                style={{ boxShadow: "0 4px 20px -4px hsl(var(--primary) / 0.2)" }}
                aria-label="Open Chatbot"
              >
                <MessageIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full p-0 overflow-hidden">
              <DialogHeader className="bg-primary/10 px-6 py-4">
                <DialogTitle>Wellness Chatbot</DialogTitle>
              </DialogHeader>
              <div className="p-4 h-80 overflow-y-auto flex flex-col gap-2 bg-background">
                {messages.map((msg, i) => (
                  <div key={i} className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${msg.from === 'user' ? 'ml-auto bg-primary text-white' : 'bg-muted text-foreground'}`}>{msg.text}</div>
                ))}
              </div>
              <form
                className="flex border-t bg-background"
                onSubmit={e => { e.preventDefault(); handleSend(); }}
              >
                <input
                  className="flex-1 px-4 py-2 outline-none bg-transparent"
                  placeholder="Ask me about stress, sleep, wellness..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  autoFocus
                />
                <Button type="submit" variant="default" className="rounded-none rounded-r-md">Send</Button>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;