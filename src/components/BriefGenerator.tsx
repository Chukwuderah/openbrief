"use client";

import { useState, useEffect, useRef } from "react";
import BriefForm, { Brief } from "@/components/BriefForm";
import BriefOutput from "@/components/BriefOutput";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BriefGenerator = () => {
  const [formData, setFormData] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const outputRef = useRef<HTMLDivElement | null>(null);

  const [briefs, setBriefs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateBrief = async (data: Brief) => {
    setFormData(data);
    setLoading(true);

    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setBriefs((prev) => {
          const updated = [...prev, result.brief];
          setCurrentIndex(updated.length - 1); // show latest brief
          return updated;
        });
        setResetTrigger(true);
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Error generating brief:",err);
      toast({ title: "Network error", description: "Check your connection." });
    } finally {
      setLoading(false);
    }
  };


  const handleRegenerateBrief = async () => {
    if (!formData) return;

    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setBriefs((prev) => [...prev, result.brief]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        toast({
          title: "❌ Failed to regenerate",
          description: result.error || "Try again.",
        });
      }
    } catch (err: unknown) {
      toast({
        title: "❌ Regeneration failed",
        description: err instanceof Error ? err.message : "Try again.",
      });
    }
  };

  useEffect(() => {
    if (briefs.length > 0 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [briefs]);

  return (
    <div className="py-4 px-1">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Brief Details</CardTitle>
          </CardHeader>
          <CardContent>
            <BriefForm
              onSubmit={generateBrief}
              loading={loading}
              reset={resetTrigger}
            />
          </CardContent>
        </Card>

        <div>
          {loading ? (
            <div className="space-y-4 p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ) : (
            <Card ref={outputRef} className="min-h-full">
              <CardHeader>
                <CardTitle>Generated Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <BriefOutput
                  briefs={briefs}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  regenerateBrief={handleRegenerateBrief}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefGenerator;
