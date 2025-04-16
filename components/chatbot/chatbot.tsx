"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset chat state when path changes
  useEffect(() => {
    setIsOpen(false);
    setShowTooltip(false);
  }, [pathname]);

  // Show tooltip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages);
  }, [messages, loadingState]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLoadingState("Analyzing request...");

    const thinkingTimer = setTimeout(() => {
      setLoadingState("Thinking...");
    }, 1500);

    const retrievingTimer = setTimeout(() => {
      setLoadingState("Retrieving response...");
    }, 3000);

    try {
      // Prepare the request body
      const requestBody = {
        user_message: input,
        chat_history: messages,
      };

      // Send request to the API
      const response = await fetch(`/api/user/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const responseJson = await response.json();

      if (!responseJson.success) {
        throw new Error(responseJson.details);
      }

      setMessages([
        ...messages,
        userMessage,
        {
          role: "assistant",
          content: responseJson.data.response,
        },
      ]);
    } catch (error) {
      console.error("Error fetching from API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please try again.",
        },
      ]);
    } finally {
      clearTimeout(thinkingTimer);
      clearTimeout(retrievingTimer);
      setIsLoading(false);
      setLoadingState(null);
    }
  };

  if (["/login", "/register"].includes(pathname)) {
    return <></>;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#8bc34a] text-white shadow-lg hover:bg-[#7cb342] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8bc34a]"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

        {/* Pulse effect when tooltip is shown */}
        {showTooltip && !isOpen && (
          <span className="absolute w-full h-full rounded-full bg-[#8bc34a] animate-ping opacity-75"></span>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 animate-fade-in">
          <div className="text-sm font-medium">Ask Me Anything</div>
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white transform rotate-45"></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#8bc34a] to-[#7cb342] text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded-full">
                <MessageSquare size={18} className="text-[#8bc34a]" />
              </div>
              <h3 className="font-medium">Ciel Power Assistant</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="bg-[#f0f4e8] p-3 rounded-full inline-flex mb-3">
                  <MessageSquare className="h-8 w-8 text-[#8bc34a]" />
                </div>
                <p className="text-sm">How can I help you today?</p>
                <p className="text-xs text-gray-400 mt-2">
                  Ask me about energy audits, home improvements, or incentives
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isLastUserMessage =
                    message.role === "user" &&
                    (index === messages.length - 1 ||
                      (index === messages.length - 2 &&
                        messages[messages.length - 1].role === "assistant"));

                  return (
                    <div key={index}>
                      <div
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3.5 ${
                            message.role === "user"
                              ? "prose-invert bg-gradient-to-br from-[#8bc34a] to-[#7cb342] text-white rounded-br-none shadow-sm"
                              : "prose bg-white shadow-sm border border-gray-100 rounded-bl-none"
                          }`}
                        >
                          <ReactMarkdown
                            components={{
                              a: ({ node, ...props }) => (
                                <a {...props} target="_blank" />
                              ),
                            }}
                            remarkPlugins={[remarkGfm]}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {isLastUserMessage && <div ref={messagesEndRef} />}
                    </div>
                  );
                })}
                {/* Loading state display */}
                {isLoading && loadingState && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-3.5 bg-white shadow-sm border border-gray-100 rounded-bl-none">
                      <div className="flex items-center">
                        <div className="mr-2 relative w-3 h-3">
                          <div className="absolute inset-0 bg-[#8bc34a] rounded-full opacity-75 animate-pulse"></div>
                          <div className="absolute inset-0.5 bg-[#8bc34a] rounded-full animate-flicker"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {loadingState}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 p-4 bg-white"
          >
            <div className="flex items-center bg-gray-50 rounded-full overflow-hidden pr-1 border border-gray-200 focus-within:border-[#8bc34a] focus-within:ring-1 focus-within:ring-[#8bc34a]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 py-2.5 px-4 bg-transparent border-none focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-[#8bc34a] text-white p-2 rounded-full hover:bg-[#7cb342] focus:outline-none focus:ring-2 focus:ring-[#8bc34a] focus:ring-offset-1 disabled:opacity-50 transition-colors ml-1"
                disabled={!input.trim() || isLoading}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
