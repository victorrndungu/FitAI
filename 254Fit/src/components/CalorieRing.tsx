interface CalorieRingProps {
  consumed: number;
  target: number;
  burned: number;
}

const CalorieRing = ({ consumed, target, burned }: CalorieRingProps) => {
  const remaining = target - consumed + burned;
  const consumedPercentage = (consumed / target) * 100;
  const burnedPercentage = (burned / target) * 100;

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Outer ring - Target */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-muted/30"
        />
        
        {/* Consumed calories */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#consumedGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${consumedPercentage * 2.827} 282.7`}
          className="transition-all duration-500"
        />
        
        {/* Burned calories overlay */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#burnedGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${burnedPercentage * 2.387} 238.7`}
          className="transition-all duration-500"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="consumedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-primary" />
            <stop offset="100%" className="stop-primary/70" />
          </linearGradient>
          <linearGradient id="burnedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-secondary" />
            <stop offset="100%" className="stop-secondary/70" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-bold text-foreground">{remaining}</div>
        <div className="text-sm text-muted-foreground">remaining</div>
      </div>

      {/* Stats below */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="font-semibold text-primary">{consumed}</div>
          <div className="text-muted-foreground">Eaten</div>
        </div>
        <div>
          <div className="font-semibold text-secondary">{burned}</div>
          <div className="text-muted-foreground">Burned</div>
        </div>
        <div>
          <div className="font-semibold text-foreground">{target}</div>
          <div className="text-muted-foreground">Goal</div>
        </div>
      </div>
    </div>
  );
};

export default CalorieRing;