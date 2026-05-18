import { Card } from "@/components/ui/card";
import { Brain, CheckCircle2, AlertCircle } from "lucide-react";
import { PredictionResult } from "@/pages/Index";

interface ResultCardProps {
  result: PredictionResult;
}

export function ResultCard({ result }: ResultCardProps) {
  
  const isParkinson = result.prediction === 1;
  

  const confidencePercent = (result.probability * 100).toFixed(1);

  return (
    <Card className="p-6 shadow-[var(--card-shadow)] animate-in fade-in-50 slide-in-from-top-4 duration-500">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        Prediction Result
      </h3>

      <div className="space-y-4">
        {/* Result Badge */}
        <div
          className={`p-4 rounded-lg border-2 transition-all ${
            isParkinson
              ? "bg-warning/10 border-warning"
              : "bg-success/10 border-success"
          }`}
        >
          <div className="flex items-start gap-3">
            {isParkinson ? (
              <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm text-foreground mb-1">
                {isParkinson ? "🧠 Likely Parkinson's Detected" : "✅ Likely Healthy"}
              </p>
              <p className="text-xs text-muted-foreground">
                Based on analysis of voice biomarkers
              </p>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Confidence Score</span>
            <span className="font-semibold text-foreground">{confidencePercent}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isParkinson ? "bg-warning" : "bg-success"
              }`}
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Please consult healthcare professionals for medical
            diagnosis.
          </p>
        </div>
      </div>
    </Card>
  );
}

