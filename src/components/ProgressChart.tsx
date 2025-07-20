import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for the past 7 days
const moodData = [
  { day: "Mon", mood: 7, stress: 4 },
  { day: "Tue", mood: 6, stress: 6 },
  { day: "Wed", mood: 8, stress: 3 },
  { day: "Thu", mood: 5, stress: 7 },
  { day: "Fri", mood: 7, stress: 5 },
  { day: "Sat", mood: 9, stress: 2 },
  { day: "Sun", mood: 8, stress: 3 },
];

export function ProgressChart() {
  const maxValue = 10;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-primary">Weekly Progress</CardTitle>
        <CardDescription>
          Your mood and stress levels over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="grid grid-cols-7 gap-2 h-40">
            {moodData.map((data, index) => (
              <div key={data.day} className="flex flex-col items-center gap-2">
                <div className="flex-1 flex flex-col-reverse w-full gap-1">
                  {/* Mood bar */}
                  <div 
                    className="bg-gradient-primary rounded-sm w-full transition-smooth"
                    style={{ height: `${(data.mood / maxValue) * 100}%` }}
                    title={`Mood: ${data.mood}/10`}
                  />
                  {/* Stress bar */}
                  <div 
                    className="bg-warning/70 rounded-sm w-full transition-smooth"
                    style={{ height: `${(data.stress / maxValue) * 100}%` }}
                    title={`Stress: ${data.stress}/10`}
                  />
                </div>
                <span className="text-xs font-medium">{data.day}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-primary rounded-sm" />
              <span className="text-sm">Mood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning/70 rounded-sm" />
              <span className="text-sm">Stress</span>
            </div>
          </div>

          {/* Summary */}
          <div className="pt-4 border-t grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {(moodData.reduce((sum, d) => sum + d.mood, 0) / moodData.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Mood</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {(moodData.reduce((sum, d) => sum + d.stress, 0) / moodData.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Stress</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}