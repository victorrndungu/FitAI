import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Chatbot = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your fitness assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your question! I'm here to help with nutrition advice, workout tips, and motivation. What specific area would you like guidance on?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      {/* Header */}
      <div className="flex items-center p-4 pt-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-primary/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Fitness Assistant</h1>
      </div>

      {/* Chat Messages */}
      <div className="px-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-[80%] shadow-lg border-0 ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                : 'bg-card/80 backdrop-blur'
            }`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  {msg.sender === 'bot' && (
                    <Bot className="h-5 w-5 mt-0.5 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <User className="h-5 w-5 mt-0.5 text-white" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about fitness..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;