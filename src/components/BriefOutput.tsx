"use client";

import { useState } from "react";
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
  brief: string;
  regenerateBrief: () => Promise<string>; // Passed from parent
}

const BriefOutput = ({ brief, regenerateBrief }: BriefOutputProps) => {
  const [briefs, setBriefs] = useState<string[]>([brief]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(brief);
      toast({
        title: "📋 Copied!",
        description: "The brief has been copied to your clipboard.",
      });
    } catch (error) {
      console.error("Copy error:", error);
      toast({
        title: "❌ Failed to copy",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownload = () => {
    try {
      setIsDownloading(true);
      const element = document.createElement("a");
      const file = new Blob([brief], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "brief.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast({
        title: "📁 Brief downloaded!",
        description: "Saved as brief.txt in your downloads.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "❌ Download failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true);
      const newBrief = await regenerateBrief();
      setBriefs([...briefs, newBrief]);
      setCurrentIndex(briefs.length); // move to new brief
    } catch {
      toast({ title: "❌ Regeneration failed", description: "Try again." });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {brief ? (
        <>
          <pre className="whitespace-pre-wrap p-4 bg-muted rounded-lg text-sm">
            {briefs[currentIndex]}
          </pre>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleCopy}
              disabled={isCopying}
              variant="outline"
              className="cursor-pointer"
            >
              <CopyIcon className="w-4 h-4" />
              {isCopying ? "Copying..." : "Copy"}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              className="cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
            <Button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              variant="outline"
              className="cursor-pointer"
            >
              <RefreshCcwIcon className="w-4 h-4" />
              {isRegenerating ? "Regenerating..." : "Regenerate"}
            </Button>
          </div>

          {briefs.length > 1 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="cursor-pointer"
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
                className="cursor-pointer"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-muted-foreground p-8 italic">
          Fill in the form and click &quot; Generate Brief &quot; to see your brief here.
        </div>
      )}
    </div>
  );
};

export default BriefOutput;
