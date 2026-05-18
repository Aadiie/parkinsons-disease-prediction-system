import { useState } from "react";
import { Info, Brain, Activity, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PredictionForm } from "@/components/PredictionForm";
import { ResultCard } from "@/components/ResultCard";
import { FeatureImportance } from "@/components/FeatureImportance";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface PredictionResult {
  prediction: number;
  probability: number;
  error?: string; 
}

const Index = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = async (formData: Record<string, number>) => {
   
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      //  FastAPI
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const apiResult: PredictionResult = await response.json();

      if (!response.ok) {
        
        throw new Error(apiResult.error || `HTTP error! status: ${response.status}`);
      }

      
      setResult(apiResult);

    } catch (err: unknown) {
      
      console.error("Prediction failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while making the prediction.";
      setError(errorMessage);
    } finally {
      
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Parkinson's Disease Prediction System
              </h1>
              <p className="text-muted-foreground text-sm max-w-3xl">
                An AI-powered system for analysing biomedical voice patterns to assess Parkinson's likelihood.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        This model is based on Random Forest trained on Parkinson's
                        Telemonitoring Dataset (UCI Repository).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-xs text-muted-foreground">
                  Learn more about the model
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Voice Measurement Data
                </h2>
              </div>
              
              {/*ADDED ERROR DISPLAY */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Prediction Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <PredictionForm
                onSubmit={handlePrediction}
                onClear={handleClear}
                isLoading={isLoading} 
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* ADDED LOADING INDICATOR  */}
            {isLoading && (
              <Card className="p-6 flex items-center justify-center shadow-lg">
                <Loader2 className="h-6 w-6 text-primary animate-spin mr-3" />
                <span className="text-lg text-muted-foreground">
                  Running prediction...
                </span>
              </Card>
            )}

            {/* Result Card */}
            {result && !isLoading && !error && <ResultCard result={result} />}

            {/* Feature Importance */}
            <FeatureImportance />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;