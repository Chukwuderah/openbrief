"use client";

import {
  CopyIcon,
  DownloadIcon,
  RefreshCcwIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface BriefOutputProps {
  briefs: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  regenerateBrief: () => void;
}

const BriefOutput = ({
  briefs,
  currentIndex,
  setCurrentIndex,
  regenerateBrief,
}: BriefOutputProps) => {
  const brief = briefs[currentIndex];
  const isMultiple = briefs.length > 1;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      toast({ title: "📋 Copied!", description: "Brief copied to clipboard." });
    } catch {
      toast({ title: "❌ Copy failed", description: "Try again." });
    }
  };

  const handleDownload = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([brief], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "brief.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast({ title: "📁 Downloaded", description: "Saved as brief.txt" });
    } catch {
      toast({ title: "❌ Download failed", description: "Try again." });
    }
  };

  return briefs.length > 0 ? (
    <div className="space-y-4">
      <pre className="whitespace-pre-wrap p-4 bg-muted rounded-lg text-sm">
        {brief}
      </pre>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleCopy} variant="outline">
          <CopyIcon className="w-4 h-4 mr-1" />
          Copy
        </Button>
        <Button onClick={handleDownload} variant="outline">
          <DownloadIcon className="w-4 h-4 mr-1" />
          Download
        </Button>
        <Button onClick={regenerateBrief} variant="outline">
          <RefreshCcwIcon className="w-4 h-4 mr-1" />
          Regenerate
        </Button>
      </div>

      {isMultiple && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <span>
            {currentIndex + 1}/{briefs.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentIndex((i) => Math.min(briefs.length - 1, i + 1))
            }
            disabled={currentIndex === briefs.length - 1}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center text-muted-foreground p-8 italic">
      Fill in the form and click &quot;Generate Brief&quot; to see your brief
      here.
    </div>
  );
};

export default BriefOutput;
