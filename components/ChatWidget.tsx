"use client";

import { useState, useRef, useEffect } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Chatbot's name — surfaced in the UI and sent to the API to keep the persona consistent.
const CHATBOT_NAME = "Alfred";

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi there, my name is ${CHATBOT_NAME}. How can I help you?`,
};

export default function ChatWidget() {
  // UI state: whether chat panel is open. Starts open so the greeting auto-pops on load.
  const [open, setOpen] = useState(true);
  // Conversation history shown in chat window; seeded with Alfred's greeting.
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  // Current text inside the input field.
  const [input, setInput] = useState("");
  // Loading indicator while waiting for API response.
  const [loading, setLoading] = useState(false);
  // Invisible anchor used for auto-scroll to latest message.
  const bottomRef = useRef<HTMLDivElement>(null);

  // Quick-start prompts shown before first message.
  const suggestedQuestions = [
    "What impact did Rohit create at ADP?",
    "Tell me about his AI experience",
    "What products has he built?",
  ];

  // Keep latest messages visible by scrolling to bottom on updates.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Sends user message to /api/chat and appends assistant response.
  const sendMessage = async (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim()) return;

    // Conversation so far, sent along so the API can maintain session memory.
    const history = messages;

    // Optimistically show user message in the UI.
    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageToSend },
    ]);

    // Clear input and show loading state while request is in-flight.
    setInput("");
    setLoading(true);

    try {
      // This hits app/api/chat/route.ts on the same Next.js app.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend, history }),
      });

      const data = await res.json();

      // Append assistant reply from API route response.
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      // Graceful fallback when network/API fails.
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    // Floating widget pinned to bottom-right on all screen sizes.
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        // Expanded chat panel container.
        <div className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-2xl rounded-2xl w-80 p-4 border border-gray-200 dark:border-zinc-700 flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Ask {CHATBOT_NAME}</div>
            <button
              // Close the chat panel without losing conversation state.
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 leading-none text-lg px-1"
            >
              ×
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-64 overflow-y-auto text-sm space-y-2">
            {/* Show suggested prompts before the user sends their first message. */}
            {messages.length === 1 && (
              <div className="text-gray-500 dark:text-zinc-400 text-sm">
                Try asking:
                <div className="mt-2 space-y-1">
                  {suggestedQuestions.map((q, i) => (
                    <div
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="cursor-pointer bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                // User messages align right, assistant aligns left.
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-black text-white dark:bg-zinc-100 dark:text-zinc-900 ml-auto"
                    : "bg-gray-100 text-black dark:bg-zinc-700 dark:text-zinc-100"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              // Small state cue while model is generating.
              <div className="text-gray-400 dark:text-zinc-500 text-sm">Thinking...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-2 flex gap-2">
            <input
              className="border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 flex-1 p-2 text-sm rounded"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              // Trigger send using current input content.
              onClick={() => sendMessage()}
              className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-900 px-3 rounded"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Floating Button: reopens the panel after it's been closed. */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-full shadow-lg"
        >
          Chat
        </button>
      )}
    </div>
  );
}