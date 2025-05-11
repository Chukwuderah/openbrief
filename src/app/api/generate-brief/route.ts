import { NextRequest, NextResponse } from "next/server";
import { Brief } from "@/components/BriefForm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  console.log("✅ API POST ROUTE HIT!");
  try {
    const body: Brief = await req.json();

    const {
      projectType,
      clientName = "the client",
      projectGoal,
      deliverables,
      timeline,
      budget = "Not specified",
      tone = "Professional",
    } = body;

    const prompt = `
You're a top-tier freelancer writing a personalized, polished project brief to send to a client. 
Use the info provided to write a professional and confident brief. Keep it under 250 words. 
Use paragraph formatting, not bullet points, and make it sound custom—not templated. Use the tone "${tone}".

Details:
- Project Type: ${projectType}
- Client Name: ${clientName}
- Project Goal: ${projectGoal}
- Deliverables: ${deliverables}
- Timeline: ${timeline}
- Budget: ${budget}

Start with a confident opening that introduces the project and the goal. 
Then explain the scope and deliverables clearly. Wrap up with the timeline and budget. 
Keep it natural, friendly, and tone-appropriate, like you're writing to a real person.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const briefText = completion.choices[0]?.message?.content?.trim();
    console.log("✅ Brief generated successfully");

    return NextResponse.json({ brief: briefText });
  } catch (err) {
    console.error("Brief generation error:", err);
    return NextResponse.json(
      { error: "Brief generation failed. Please try again." },
      { status: 500 }
    );
  }
}
