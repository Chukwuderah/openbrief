"use client";

import { useState, useEffect, useRef } from "react";
import BriefForm, { Brief } from "@/components/BriefForm";
import BriefOutput from "@/components/BriefOutput";
import { toast } from "@/components/ui/use-toast";

const BriefGenerator = () => {
  const [brief, setBrief] = useState("");
  const [formData, setFormData] = useState<Brief | null>(null); // store last data
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const outputRef = useRef<HTMLDivElement | null>(null);

  const generateBrief = async (data: Brief) => {
    // console.log("Submitted data:", data);
    setFormData(data); // Save latest form submission
    setLoading(true);
    setBrief("");

    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setBrief(result.brief);
        setResetTrigger(true); // Trigger form reset
      } else {
        toast({
          title: "⚠️ Error generating brief",
          description: result.error || "Something went wrong.",
        });
      }
    } catch (err) {
      toast({
        title: "⚠️ Network error",
        description: err instanceof Error ? err.message : "Check your connection or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateBrief = async (): Promise<string> => {
    if (!formData) throw new Error("No form data available");

    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        return result.brief;
      } else {
        throw new Error(result.error || "Error regenerating brief");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "❌ Failed to regenerate",
          description: err.message,
        });
      } else {
        toast({
          title: "❌ Failed to regenerate",
          description: "Try again.",
        });
      }
      return "";
    }
  };

  useEffect(() => {
    if (brief && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [brief]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <BriefForm
          onSubmit={generateBrief}
          loading={loading}
          reset={resetTrigger}
        />
      </div>
      <div>
        {loading ? (
          <div className="space-y-4 p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ) : (
          <div ref={outputRef}>
            {brief && (
              <p className="text-green-600 font-semibold mb-4 animate-fade-in">
                ✅ Brief generated successfully!
              </p>
            )}
            <BriefOutput
              brief={brief}
              regenerateBrief={handleRegenerateBrief}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefGenerator;
