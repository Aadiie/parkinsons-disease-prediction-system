import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface FeatureInputProps {
  name: string;
  label: string;
  description: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export function FeatureInput({
  name,
  label,
  description,
  value,
  onChange,
}: FeatureInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="p-0.5 hover:bg-muted rounded">
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id={name}
        name={name}
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder="Enter value"
        className="bg-background border-input focus:ring-primary focus:border-primary transition-colors"
      />
    </div>
  );
}
