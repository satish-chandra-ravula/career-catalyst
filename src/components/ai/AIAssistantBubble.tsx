import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Message {
  id: string;
  text: string;
  type: "info" | "success" | "action";
}

interface AIAssistantBubbleProps {
  messages?: Message[];
  isProcessing?: boolean;
}

const defaultMessages: Message[] = [
  { id: "1", text: "Hi! I'm your AI resume assistant. 👋", type: "info" },
];

const AIAssistantBubble = ({ 
  messages = defaultMessages, 
  isProcessing = false 
}: AIAssistantBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [messageQueue, setMessageQueue] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length > 0 && !currentMessage) {
      setMessageQueue(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (messageQueue.length > 0 && !currentMessage) {
      const nextMessage = messageQueue[0];
      setCurrentMessage(nextMessage);
      setMessageQueue((prev) => prev.slice(1));
      setDisplayedText("");
    }
  }, [messageQueue, currentMessage]);

  useEffect(() => {
    if (currentMessage && displayedText.length < currentMessage.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentMessage.text.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (currentMessage && displayedText.length === currentMessage.text.length) {
      const timeout = setTimeout(() => {
        setCurrentMessage(null);
        setDisplayedText("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentMessage, displayedText]);

  const getMessageStyle = (type: Message["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/10 border-success/30 text-success";
      case "action":
        return "bg-primary/10 border-primary/30 text-primary";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="hero"
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="relative"
              >
                <Bot className="w-6 h-6" />
                {(currentMessage || isProcessing) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-card border rounded-2xl shadow-floating overflow-hidden">
              {/* Header */}
              <div className="gradient-bg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-primary-foreground/80">
                    {isProcessing ? "Working on it..." : "Ready to help"}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 min-h-[120px] max-h-[300px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {currentMessage ? (
                    <motion.div
                      key={currentMessage.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-xl border ${getMessageStyle(currentMessage.type)}`}
                    >
                      <p className="text-sm">
                        {displayedText}
                        <span className="animate-blink">|</span>
                      </p>
                    </motion.div>
                  ) : isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm">Processing...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-muted-foreground py-6"
                    >
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Upload a resume to get started!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Actions */}
              <div className="p-4 pt-0 flex flex-wrap gap-2">
                <Button variant="soft" size="sm" className="text-xs">
                  Analyze Resume
                </Button>
                <Button variant="soft" size="sm" className="text-xs">
                  Find Jobs
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistantBubble;
