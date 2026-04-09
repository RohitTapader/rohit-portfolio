"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What impact did Rohit create at ADP?",
    "Tell me about his AI experience",
    "What products has he built?",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageToSend },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="bg-white shadow-2xl rounded-2xl w-80 p-4 border flex flex-col">
          
          {/* Header */}
          <div className="font-semibold mb-2">Ask about Rohit</div>

          {/* Chat Area */}
          <div className="h-64 overflow-y-auto text-sm space-y-2">
            {messages.length === 0 && (
              <div className="text-gray-500 text-sm">
                Try asking:
                <div className="mt-2 space-y-1">
                  {suggestedQuestions.map((q, i) => (
                    <div
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="cursor-pointer bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
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
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-100 text-black"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm">Thinking...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-2 flex gap-2">
            <input
              className="border flex-1 p-2 text-sm rounded"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={() => sendMessage()}
              className="bg-black text-white px-3 rounded"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white px-4 py-2 rounded-full shadow-lg"
      >
        Chat
      </button>
    </div>
  );
}