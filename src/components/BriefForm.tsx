"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "./ui/use-toast";

// Either import from a shared types file or keep this here
export type Brief = {
  projectType: string;
  clientName: string;
  projectGoal: string;
  deliverables: string;
  timeline: string;
  budget?: string;
  tone: string;
};

interface BriefFormProps {
  onSubmit: (brief: Brief) => void;
  loading: boolean;
  reset: boolean;
}

const projectTypes = [
  "Web Design",
  "Logo Design",
  "Copywriting",
  "Branding",
  "Social Media",
  "Mobile App",
  "Other",
];

const toneOptions = [
  "Professional",
  "Casual",
  "Friendly",
  "Formal",
  "Technical",
];

const BriefForm = ({ onSubmit, loading, reset }: BriefFormProps) => {
  const [formData, setFormData] = useState<Brief>({
    projectType: "",
    clientName: "",
    projectGoal: "",
    deliverables: "",
    timeline: "",
    budget: "",
    tone: "Professional",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation check
    const requiredFields = [
      "projectType",
      "clientName",
      "projectGoal",
      "deliverables",
      "timeline",
    ];
    const hasEmpty = requiredFields.some(
      (field) => !formData[field as keyof Brief]
    );

    if (hasEmpty) {
      toast({
        title: "🚫 Incomplete form",
        description: "Please fill out all required fields.",
      });
      return;
    }

    console.log("🔄 Calling onSubmit with:", formData);
    onSubmit(formData);
    console.log("Form Submitting");
  };

  const handleChange = (field: keyof Brief, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (reset) {
      setFormData({
        projectType: "",
        clientName: "",
        projectGoal: "",
        deliverables: "",
        timeline: "",
        budget: "",
        tone: "Professional",
      });
    }
  }, [reset]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type</Label>
        <Select
          value={formData.projectType}
          onValueChange={(value) => handleChange("projectType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          placeholder="Enter client name"
          value={formData.clientName}
          onChange={(e) => handleChange("clientName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectGoal">Project Goal</Label>
        <Textarea
          id="projectGoal"
          placeholder="What does the client want to achieve?"
          value={formData.projectGoal}
          onChange={(e) => handleChange("projectGoal", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliverables">Deliverables</Label>
        <Textarea
          id="deliverables"
          placeholder="What will you provide?"
          value={formData.deliverables}
          onChange={(e) => handleChange("deliverables", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Input
          id="timeline"
          placeholder="e.g., 2 weeks, 1 month"
          value={formData.timeline}
          onChange={(e) => handleChange("timeline", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget (Optional)</Label>
        <Input
          id="budget"
          placeholder="Enter budget"
          value={formData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone">Tone</Label>
        <Select
          value={formData.tone}
          onValueChange={(value) => handleChange("tone", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            {toneOptions.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Brief"}
      </Button>
    </form>
  );
};

export default BriefForm;
