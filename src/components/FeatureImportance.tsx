import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const topFeatures = [
  { name: "DFA", importance: 0.18, description: "Detrended fluctuation analysis" },
  { name: "RPDE", importance: 0.15, description: "Recurrence period density entropy" },
  { name: "PPE", importance: 0.13, description: "Pitch period entropy" },
  { name: "HNR", importance: 0.11, description: "Harmonics-to-noise ratio" },
  { name: "Jitter(%)", importance: 0.09, description: "Frequency variation" },
];

export function FeatureImportance() {
  const maxImportance = Math.max(...topFeatures.map(f => f.importance));

  return (
    <Card className="p-6 shadow-[var(--card-shadow)]">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-accent" />
        Top 5 Important Features
      </h3>

      <div className="space-y-4">
        {topFeatures.map((feature, index) => (
          <div key={feature.name} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-sm font-medium text-foreground">
                  {index + 1}. {feature.name}
                </span>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <span className="text-xs font-semibold text-primary tabular-nums">
                {(feature.importance * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${(feature.importance / maxImportance) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Feature importance derived from Random Forest model. Higher values indicate
          stronger influence on prediction outcome.
        </p>
      </div>
    </Card>
  );
}
