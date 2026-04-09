import { NextResponse } from "next/server";

const MAX_INPUT_LENGTH = 300;

// Basic keyword filter (can expand later)
const blockedKeywords = [
  "hate",
  "kill",
  "racist",
  "religion",
  "terrorist",
  "sex",
  "porn",
  "violence",
  "abuse",
];

// Check for unsafe input
function isUnsafeInput(input: string) {
  const lower = input.toLowerCase();
  return blockedKeywords.some((word) => lower.includes(word));
}

// Check if query is relevant to Rohit
function isRelevant(input: string) {
  const keywords = ["rohit", "experience", "adp", "highradius", "mindtree", "skills", "product"];
  const lower = input.toLowerCase();
  return keywords.some((word) => lower.includes(word));
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1️⃣ Input length control (cost control)
    if (!message || message.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({
        reply: "Please keep your question short and relevant.",
      });
    }

    // 2️⃣ Block unsafe content
    if (isUnsafeInput(message)) {
      return NextResponse.json({
        reply: "Sorry, I cannot process inappropriate or sensitive requests.",
      });
    }

    // 3️⃣ Relevance check
    if (!isRelevant(message)) {
      return NextResponse.json({
        reply: "I can only answer questions related to Rohit's experience, skills, and work.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",

        // 💰 COST CONTROL
        max_tokens: 120,
        temperature: 0.3,

        messages: [
          {
            role: "system",
            content: `You are an AI assistant representing Rohit Tapader.

STRICT RULES:
- Answer ONLY based on the provided information below
- DO NOT hallucinate or make up details
- If unsure, say: "I don't have that information"
- Keep answers concise (max 4-5 lines)
- Focus on measurable impact

SAFETY RULES:
- Do NOT generate offensive, political, religious, or sensitive content
- Do NOT answer anything unrelated to Rohit’s professional background
- Do NOT perform or suggest external actions (APIs, transactions, etc.)

CONTEXT (SOURCE OF TRUTH):

Rohit Tapader is a Product Manager with 5+ years experience in B2B SaaS, automation, and AI-driven systems.

ADP:
- Built a scalable billing system integrating multiple data touchpoints, driving adoption to
400 existing & new clients in 1.5 years reducing manual billing effort by 50% and preventing
$250K annual credits caused by incorrect billing.

- Redesigned Tax Filing workflows by automating manual Service & Operations touchpoints
& introducing rule-based validation for jurisdiction-specific checks, improving efficiency by
25%

- Launched a plug and play solution to standardize integration format based on mid-market client feedback, reducing onboarding time by
15% and improving integration adoption by 20%

-Led a POC for an Agentic AI-driven service automation solution, automating ~40% of Tier-1 support requests
(e.g., invoice/ billing queries, account updates) via LLM + API orchestration; demonstrated
~$400K to $600K annual savings potentialbased on pilot volumes (~12000 tickets)

HighRadius:
- Led 0→1 launch of a product, enabling automation of core product workflows, achieving ~30% pilot-to-paid conversion within 3 months and scaling from 15 to 85 paying customers over 18 months.
- Built a rule-based and AI-assisted system for transaction matching across bank, AR, and GL data, improving auto-reconciliation rates to
88% and reducing manual effort by 65%

- Developed shared platform capabilities (ERP integrations, orchestration, reusable objects), reducing duplicate development effort by 25% and improving delivery timelines by 20%
- Increased feature adoption by 20% by aligning Sales and Customer Success on use-case qualification, onboarding journeys, and targeted engagement to drive consistent feature usage.

Mindtree:
- Delivered a fleet and tyre lifecycle management platform, improving visibility across inventory, inspection, and lifecycle performance.
- Designed tyre condition tracking capabilities, improving data completeness by
30% and enabling better maintenance decisions.
- Built an end-to-end tyre inspection system, reducing manual reporting effort by
50% and improving turnaround time
- Introduced a tyre reuse capability, reducing wastage by
10% and improving cost efficiency.
- Improved data quality by 25% by integrating structured inspection and performance parameters

TCS:
- Developed new credit card and forbearance workflows, improving client adoption by
20%
- Migrated legacy systems to microservices architecture, improving efficiency by
30%
- Automated unit testing systems, reducing testing time by 25% and improving release quality.

Only use the above information.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

    // 4️⃣ Output safety filter
    if (isUnsafeInput(reply)) {
      reply = "I'm unable to respond to that request.";
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}