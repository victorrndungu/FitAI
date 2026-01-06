import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const WeightChart = () => {
  // Mock weight data
  const data = [
    { date: '1/1', weight: 72, goal: 65 },
    { date: '1/8', weight: 71.5, goal: 65 },
    { date: '1/15', weight: 70.8, goal: 65 },
    { date: '1/22', weight: 70.2, goal: 65 },
    { date: '1/29', weight: 69.5, goal: 65 },
    { date: '2/5', weight: 69.0, goal: 65 },
    { date: '2/12', weight: 68.3, goal: 65 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`Date: ${label}`}</p>
          <p className="text-sm text-primary">
            {`Weight: ${payload[0].value}kg`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Goal: ${payload[1]?.value}kg`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            domain={['dataMin - 1', 'dataMax + 1']}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="goal" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary rounded"></div>
          <span className="text-muted-foreground">Current Weight</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-muted-foreground rounded" style={{ background: 'repeating-linear-gradient(to right, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 3px, transparent 3px, transparent 8px)' }}></div>
          <span className="text-muted-foreground">Goal Weight</span>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;