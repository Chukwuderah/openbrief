import { NextRequest, NextResponse } from "next/server";
import { Brief } from "@/components/BriefForm";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  console.log("AI API POST route hit!");
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

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const briefText = response.text().trim();

    console.log("Brief:", briefText);

    return NextResponse.json({ brief: briefText });
  } catch (err) {
    console.error("❌ AI brief generation error:", err);
    return NextResponse.json(
      { error: "AI brief generation failed. Please try again." },
      { status: 500 }
    );
  }
}
