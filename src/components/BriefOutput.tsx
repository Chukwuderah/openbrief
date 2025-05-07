"use client";

import { useState } from "react";
import { CopyIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface BriefOutputProps {
  brief: string;
}

const BriefOutput = ({ brief }: BriefOutputProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(brief);
      toast({
        title: "📋 Copied!",
        description: "The brief has been copied to your clipboard.",
      });
    } catch (error) {
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
      toast({
        title: "❌ Download failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      {brief ? (
        <>
          <pre
            className="whitespace-pre-wrap p-4 bg-muted rounded-lg text-sm"
            aria-label="Generated brief"
          >
            {brief}
          </pre>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCopy}
              aria-label="Copy brief to clipboard"
              disabled={isCopying}
            >
              <CopyIcon className="h-4 w-4" />
              {isCopying ? "Copying..." : "Copy"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDownload}
              aria-label="Download brief as .txt file"
              disabled={isDownloading}
            >
              <DownloadIcon className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground p-8 italic">
          👋 Start by filling out the brief form above. Your shiny,
          ready-to-send brief will appear here.
        </div>
      )}
    </div>
  );
};

export default BriefOutput;
