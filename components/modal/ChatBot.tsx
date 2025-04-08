"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type ExampleQuestion = {
  title: string;
  description: string;
  icon: string;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Make sure the scroll happens when messages update

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getExampleQuestions = (): ExampleQuestion[] => {
    return [
      {
        title: "Energy Efficiency",
        description: "What are the most cost-effective energy improvements?",
        icon: "💡",
      },
      {
        title: "Cost Savings",
        description: "How much can I save on energy bills?",
        icon: "💰",
      },
      {
        title: "Installation",
        description: "What's the typical timeline for improvements?",
        icon: "⏱️",
      },
      {
        title: "Financing",
        description: "What financing options are available?",
        icon: "🏦",
      },
    ];
  };

  const handleSend = async (inputValue: string) => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { timeStyle: "short" }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data.response);

      const aiMessage: Message = {
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString([], { timeStyle: "short" }),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error in API call:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date().toLocaleTimeString([], { timeStyle: "short" }),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      scrollToBottom();
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question: ExampleQuestion) => {
    handleSend(question.description);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {showWelcome && <div></div>}

      <Button
        className="fixed bottom-4 right-10 rounded-full h-14 w-14 p-0 shadow-lg z-[2] bg-lime-500 hover:bg-lime-600"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <div
        className={`fixed bottom-0 right-0 max-w-[100vw] z-[30] w-[400px] bg-background shadow-lg transform transition-transform duration-300 ease-in-out h-[calc(100vh)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="font-semibold">Ceil Power AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-2 py-2">
            {messages.length === 0 ? (
              <>
                <div className="flex items-center gap-2 pt-4 text-sm text-gray-600">
                  <HelpCircle className="h-4 w-4" />
                  <span>Try asking these questions:</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {getExampleQuestions().map((question, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors h-full"
                      onClick={() => handleQuestionClick(question)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{question.icon}</span>
                          <h3 className="font-medium text-gray-900">
                            {question.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                          {question.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[75%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-lime-500 text-xs sm:text-sm text-primary-foreground"
                          : "bg-muted text-xs sm:text-sm"
                      }`}
                    >
                      <ReactMarkdown
                        className={cn(
                          "prose-sm",
                          message.role === "user" ? "prose-invert" : "prose",
                        )}
                      >
                        {message.content}
                      </ReactMarkdown>
                      <p className="text-[10px] opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <Card className="w-fit">
                  <CardContent className="p-2">
                    <Badge variant="secondary">AI is typing...</Badge>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={chatEndRef} />
          </ScrollArea>

          <div className="p-2 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                className="h-10"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
              />
              <Button
                size="icon"
                className="bg-lime-500 hover:bg-lime-600"
                onClick={() => handleSend(inputValue)}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
