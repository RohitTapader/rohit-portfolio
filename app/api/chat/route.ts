import { NextResponse } from "next/server";

// Chatbot's name — kept in sync with components/ChatWidget.tsx.
const CHATBOT_NAME = "Alfred";

// Keep messages short to control API cost and abuse.
const MAX_INPUT_LENGTH = 300;

// Cap how much prior conversation we forward, to bound token cost per request.
const MAX_HISTORY_MESSAGES = 10;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Basic keyword filter (can expand later).
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

// Returns true when user text includes blocked/sensitive words.
// Uses word boundaries so unrelated words aren't caught (e.g. "skills" contains "kill").
function isUnsafeInput(input: string) {
  const lower = input.toLowerCase();
  return blockedKeywords.some((word) => new RegExp(`\\b${word}\\b`).test(lower));
}

// Restrict questions to the portfolio topic.
function isRelevant(input: string) {
  const keywords = [
    "rohit", "experience", "adp", "highradius", "livecube", "mindtree", "tcs",
    "tata", "skills", "product", "education", "tools", "background", "resume",
  ];
  const lower = input.toLowerCase();
  return keywords.some((word) => lower.includes(word));
}

// Handles POST /api/chat from ChatWidget.tsx.
export async function POST(req: Request) {
  try {
    // Read user message and prior conversation (session memory) from the request body.
    const { message, history } = await req.json();
    const priorMessages: ChatMessage[] = Array.isArray(history) ? history : [];

    // 1) Input length control (cost + stability).
    if (!message || message.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({
        reply: "Please keep your question short and relevant.",
      });
    }

    // 2) Block unsafe/sensitive requests.
    if (isUnsafeInput(message)) {
      return NextResponse.json({
        reply: "Sorry, I cannot process inappropriate or sensitive requests.",
      });
    }

    // 3) Reject off-topic questions. Once a conversation is already underway, allow
    // natural follow-ups (e.g. "and how much did that save?") even without a keyword hit.
    if (priorMessages.length === 0 && !isRelevant(message)) {
      return NextResponse.json({
        reply: "I can only answer questions related to Rohit's experience, skills, and work.",
      });
    }

    // Only forward the most recent turns to bound token cost, and only real
    // conversation turns (skip Alfred's canned greeting, which carries no info).
    const recentHistory = priorMessages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-MAX_HISTORY_MESSAGES);

    // Server-side call to OpenAI; API key stays hidden in .env.local.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",

        // Cost-control settings: focused answers with room for a short list when needed.
        max_tokens: 220,
        temperature: 0.3,

        messages: [
          {
            role: "system",
            content: `You are ${CHATBOT_NAME}, an AI assistant representing Rohit Tapader.

STRICT RULES:
- Answer ONLY based on the provided information below
- DO NOT hallucinate or make up details
- If unsure, say: "I don't have that information"
- Focus on measurable impact

FORMATTING RULES (the UI renders these, so follow them exactly):
- If the answer has 2+ distinct points (achievements, skills, tools, roles), start with one short lead-in sentence, then list each point on its own line starting with "- ".
- If the answer is a single point, write 1-3 short sentences with no list.
- Wrap key metrics and names (e.g. **50%**, **LiveCube**) in double asterisks.
- Do not use headers, numbered lists, or nested bullets. Keep each bullet to one line.
- Keep the whole answer under ~80 words.

SAFETY RULES:
- Do NOT generate offensive, political, religious, or sensitive content
- Do NOT answer anything unrelated to Rohit’s professional background
- Do NOT perform or suggest external actions (APIs, transactions, etc.)

CONTEXT (SOURCE OF TRUTH):

Rohit Tapader is a Product Manager with 8.5+ years of experience building and scaling B2B enterprise SaaS and platform products in HCM, FinTech, and Manufacturing domains.

ADP Private Limited, Senior Product Manager - 1 (04/2024 - Present, Hyderabad):
- Spearheaded development of a scalable, multi-source billing system, onboarding 700+ clients within 18 months, reducing manual billing effort by 50% and eliminating $450K in annual revenue leakage.
- Led cross-functional discovery and workflow redesign with Engineering, UX, and Operations to automate manual touchpoints in Tax filing workflows, improving operational efficiency by 25%.
- Built a standardized plug-and-play ERP integration framework for mid-market ERP clients, reducing integration setup time by 30% across multiple ERP systems.
- Defined MVP and rollout strategy for an Agentic AI-driven service automation solution, automating 40% of Tier-1 support requests and demonstrating ~$400K-$600K annual savings potential based on pilot volumes (~12,000 tickets).

HighRadius Corporation, Associate Product Manager (05/2022 - 04/2024, Hyderabad):
- Led 0→1 product launch of LiveCube, a low-code finance process automation product, reducing manual efforts around Close Management process by 40%.
- Drove MVP definition and phased rollout strategy of LiveCube, validated product-market fit through pilot cohorts and iterative feedback loops, achieving 30% pilot-to-paid client conversion.
- Conducted market research and customer interviews, partnered with Sales and Customer Success to prioritize features, driving onboarding of the first 25 customers, including 5 enterprise accounts, within 1 year of launch.
- Built a rule-based and AI-assisted financial reconciliation capability, reducing manual reconciliation efforts by 60%.
- Partnered with platform and product teams on shared service platform capabilities, reducing delivery timelines for consuming product teams by 20%.

Mindtree Limited, Product Owner (06/2021 - 04/2022, Kolkata):
- Delivered a fleet and tyre lifecycle management platform, improving operational visibility across inventory, inspection, and performance tracking for enterprise clients.
- Built an end-to-end tyre inspection system for fleets, reducing manual reporting effort and improving inspection turnaround time by 40%.
- Introduced tyre reuse capabilities, reducing tyre wastage by 10% and improving cost efficiency for commercial fleet customers.

Tata Consultancy Services Limited, Software Engineer (10/2016 - 02/2020, Hyderabad):
- Contributed to modernization of a credit card servicing platform through migration to microservice architecture, improving reliability, reducing response times, and supporting 20% growth in digital customer adoption.
- Implemented customer-facing credit card servicing features, including statement management and transaction history workflows, improving account visibility and self-serve experience.
- Optimized the delivery phase of the product life cycle by automating unit testing, reducing testing time by 25% and improving overall release quality.

SKILLS:
- Product Management: Product Roadmapping, 0→1 Product Development & Launch, Market Research, Customer Research, Feature Prioritization, Stakeholder Management, Cross-functional Collaboration, Agile (Scrum).
- Technical: SQL, REST APIs, JSON, System Integrations, Workflow Automation, Generative AI, LLMs, RAG Systems, Model Evaluation.
- Tools & AI: Jira, Confluence, Figma, Miro, Pendo, Cursor, Claude Code.

EDUCATION:
- Post Graduate Program in Management, Great Lakes Institute of Management, Chennai (2020-2021), 3.24/4 - Distinction.
- Bachelor of Technology, Heritage Institute of Technology, Kolkata (2012-2016), 8.17/10.

Only use the above information.`,
          },
          // Prior turns give the model session/conversation memory for this chat.
          ...recentHistory,
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

    // 4) Safety check on model output before returning to UI.
    if (isUnsafeInput(reply)) {
      reply = "I'm unable to respond to that request.";
    }

    // ChatWidget consumes { reply } and renders it in chat bubbles.
    return NextResponse.json({ reply });

  } catch (error) {
    // Generic fallback so UI always gets a response shape.
    console.error("Error:", error);

    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}