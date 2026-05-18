import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeatureInput } from "@/components/FeatureInput";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PredictionFormProps {
  onSubmit: (data: Record<string, number>) => Promise<void>;
  onClear: () => void;
  isLoading: boolean; 
}




const features = [
  { name: "age", label: "Age", description: "Age of the patient in years" },
  { name: "sex", label: "Sex", description: "Gender (0 = Female, 1 = Male)" },
  { name: "test_time", label: "Test Time", description: "Time from baseline test (days)" },
  { name: "jitter_percent", label: "Jitter(%)", description: "Measures variation in fundamental frequency" },
  { name: "jitter_abs", label: "Jitter(Abs)", description: "Absolute jitter in microseconds" },
  { name: "jitter_rap", label: "Jitter:RAP", description: "Relative amplitude perturbation" },
  { name: "jitter_ppq5", label: "Jitter:PPQ5", description: "Five-point period perturbation quotient" },
  { name: "jitter_ddp", label: "Jitter:DDP", description: "Average absolute difference of differences" },
  { name: "shimmer", label: "Shimmer", description: "Variation in amplitude" },
  { name: "shimmer_db", label: "Shimmer(dB)", description: "Shimmer in decibels" },
  { name: "shimmer_apq3", label: "Shimmer:APQ3", description: "Three-point amplitude perturbation quotient" },
  { name: "shimmer_apq5", label: "Shimmer:APQ5", description: "Five-point amplitude perturbation quotient" },
  { name: "shimmer_apq11", label: "Shimmer:APQ11", description: "Eleven-point amplitude perturbation quotient" },
  { name: "shimmer_dda", label: "Shimmer:DDA", description: "Average absolute difference of differences for shimmer" },
  { name: "nhr", label: "NHR", description: "Noise-to-harmonics ratio" },
  { name: "hnr", label: "HNR", description: "Harmonics-to-noise ratio" },
  { name: "rpde", label: "RPDE", description: "Recurrence period density entropy" },
  { name: "dfa", label: "DFA", description: "Detrended fluctuation analysis" },
  { name: "ppe", label: "PPE", description: "Pitch period entropy" },
];

export function PredictionForm({ onSubmit, onClear, isLoading }: PredictionFormProps) { 
  const [formData, setFormData] = useState<Record<string, string>>({});
  

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields = features.filter(f => !formData[f.name] || formData[f.name].trim() === '');
    if (missingFields.length > 0) {
      toast.error(`Please fill in all fields. Missing: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    
    const numericData: Record<string, number> = {};
    for (const [key, value] of Object.entries(formData)) {
      const num = parseFloat(value);
      if (isNaN(num)) {
        toast.error(`Invalid number for ${key}`);
        return;
      }
      
      numericData[key] = num;
    }

    
    try {
      await onSubmit(numericData);
      toast.success("Prediction completed successfully");
    } catch (error) {
      
      toast.error("Prediction failed. Check the error message on the side.");
    } finally {
      //
    }
  };

  const handleClear = () => {
    setFormData({});
    onClear();
    toast.info("Form cleared");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <FeatureInput
            key={feature.name}
            name={feature.name}
            label={feature.label}
            description={feature.description}
            value={formData[feature.name] || ""}
            onChange={handleInputChange}
          />
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading} 
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Analyzing..." : "Predict"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isLoading} 
        >
          Clear Inputs
        </Button>
      </div>
    </form>
  );
}

