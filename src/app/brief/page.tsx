"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BriefForm from "@/components/BriefForm";
import BriefOutput from "@/components/BriefOutput";

export type Brief = {
  projectType: string;
  clientName: string;
  projectGoal: string;
  deliverables: string;
  timeline: string;
  budget?: string;
  tone: string;
};

const BriefPage = () => {
  const [generatedBrief, setGeneratedBrief] = useState<string>("");

  const handleBriefGeneration = (briefData: Brief) => {
    const brief = `
Project Type: ${briefData.projectType}
Client: ${briefData.clientName}

Project Goal:
${briefData.projectGoal}

Deliverables:
${briefData.deliverables}

Timeline: ${briefData.timeline}
${briefData.budget ? `Budget: ${briefData.budget}` : ""}
Tone: ${briefData.tone}
    `;

    setGeneratedBrief(brief.trim());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Generate Brief</h1>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Fill in the details below to generate your brief.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Brief Details</CardTitle>
            </CardHeader>
            <CardContent>
              <BriefForm onSubmit={handleBriefGeneration} loading={false} reset={false} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <BriefOutput brief={generatedBrief} regenerateBrief={() => Promise.resolve("")} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BriefPage;
