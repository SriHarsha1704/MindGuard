import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [settings, setSettings] = useState({
    dataSharing: false,
    notifications: true,
    darkMode: false,
    wearableSync: false,
    professionalHelp: true,
    dataRetention: "1year",
    emergencyContact: true
  });
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Data export started",
      description: "Your data will be ready for download shortly. Check your email.",
    });
  };

  const handleDataDeletion = () => {
    toast({
      title: "Data deletion requested",
      description: "Your data deletion request has been submitted. This action cannot be undone.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>← Back to Dashboard</Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-primary">Settings & Privacy</h1>
        <p className="text-muted-foreground">Manage your account and privacy preferences</p>
      </div>

      {/* Privacy & Data Control */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔒</span>
            <span>Privacy & Data Control</span>
          </CardTitle>
          <CardDescription>
            You have complete control over your mental health data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="data-sharing" className="text-base font-medium">
                Data Sharing for Research
              </Label>
              <p className="text-sm text-muted-foreground">
                Help improve mental health AI by sharing anonymized data
              </p>
            </div>
            <Switch
              id="data-sharing"
              checked={settings.dataSharing}
              onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="professional-help" className="text-base font-medium">
                Professional Help Escalation
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to suggest professional help when needed
              </p>
            </div>
            <Switch
              id="professional-help"
              checked={settings.professionalHelp}
              onCheckedChange={(checked) => handleSettingChange('professionalHelp', checked)}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={handleDataExport}
              className="hover:bg-primary/5 transition-smooth"
            >
              📥 Download My Data
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDataDeletion}
              className="hover:opacity-90 transition-smooth"
            >
              🗑️ Delete All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔔</span>
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>
            Customize when and how you receive wellness reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="notifications" className="text-base font-medium">
                Daily Check-in Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to log your daily wellness metrics
              </p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="emergency-contact" className="text-base font-medium">
                Emergency Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Critical alerts when stress levels are concerning
              </p>
            </div>
            <Switch
              id="emergency-contact"
              checked={settings.emergencyContact}
              onCheckedChange={(checked) => handleSettingChange('emergencyContact', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Wearable Integration */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>⌚</span>
            <span>Wearable Integration</span>
          </CardTitle>
          <CardDescription>
            Connect fitness trackers for more accurate wellness insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="wearable-sync" className="text-base font-medium">
                Automatic Data Sync
              </Label>
              <p className="text-sm text-muted-foreground">
                Sync heart rate, sleep, and activity data automatically
              </p>
            </div>
            <Switch
              id="wearable-sync"
              checked={settings.wearableSync}
              onCheckedChange={(checked) => handleSettingChange('wearableSync', checked)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-smooth cursor-pointer">
              <div className="text-center space-y-2">
                <div className="text-2xl">📱</div>
                <p className="text-sm font-medium">Apple Watch</p>
                <Badge variant="outline">Not Connected</Badge>
              </div>
            </Card>
            <Card className="p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-smooth cursor-pointer">
              <div className="text-center space-y-2">
                <div className="text-2xl">⌚</div>
                <p className="text-sm font-medium">Fitbit</p>
                <Badge variant="outline">Not Connected</Badge>
              </div>
            </Card>
            <Card className="p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-smooth cursor-pointer">
              <div className="text-center space-y-2">
                <div className="text-2xl">🏃</div>
                <p className="text-sm font-medium">Garmin</p>
                <Badge variant="outline">Not Connected</Badge>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎨</span>
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>
            Customize the app's appearance for comfort
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dark-mode" className="text-base font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Reduce eye strain with a darker theme
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="shadow-soft hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>👤</span>
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>
            View and manage your account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Name</Label>
              <p className="text-base">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
              <p className="text-base">January 2024</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Data Points Collected</Label>
              <p className="text-base">247 entries</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Wellness Score</Label>
              <p className="text-base">85/100</p>
            </div>
          </div>

          <Separator />

          <div className="flex space-x-4">
            <Button variant="outline" className="hover:bg-primary/5 transition-smooth">
              Change Password
            </Button>
            <Button variant="outline" className="hover:bg-primary/5 transition-smooth">
              Update Email
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="ml-auto">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;