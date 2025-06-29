import { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { mentorService, type Suggestion, type FAQCategory, type FAQ } from '@/services/mentorService';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const MentorChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    fetchSuggestions();
    fetchFaqCategories();
    // Add welcome message
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your mentor assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSuggestions = async () => {
    try {
      const data = await mentorService.getSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const fetchFaqCategories = async () => {
    try {
      const data = await mentorService.getCategories();
      setFaqCategories(data);
      if (data.length > 0) {
        setActiveCategory(data[0].id);
        fetchFaqs(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching FAQ categories:', error);
    }
  };

  const fetchFaqs = async (categoryId: number) => {
    try {
      const data = await mentorService.getFAQs(categoryId);
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await mentorService.sendMessage(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't process your request at the moment.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const toggleChat = () => {
    if (isOpen) {
      // If chat is open, toggle minimized state
      setIsMinimized(!isMinimized);
    } else {
      // If chat is closed, open it and ensure it's not minimized
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };



  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 bg-primary hover:bg-primary/90 shadow-lg z-50"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md z-50">
      <Card className={`${isMinimized ? 'h-16 overflow-hidden' : 'h-[600px]'} flex flex-col shadow-xl`}>
        <CardHeader className="p-4 border-b bg-primary/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Mentor Assistant</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Suggestions */}
              {suggestions.length > 0 && messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <div className="text-xs text-muted-foreground mb-2">Try asking:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((suggestion) => (
                      <Button
                        key={suggestion.id}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2 whitespace-normal text-left"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Categories */}
              {faqCategories.length > 0 && (
                <div className="border-t p-4">
                  <div className="text-sm font-medium mb-2">Browse FAQs</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {faqCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => {
                          setActiveCategory(category.id);
                          fetchFaqs(category.id);
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                  <ScrollArea className="h-24 pr-2">
                    <div className="space-y-2">
                      {faqs.map((faq) => (
                        <div 
                          key={faq.id} 
                          className="text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                          onClick={() => {
                            const faqMessage: Message = {
                              id: `faq-${faq.id}`,
                              text: `${faq.question}\n\n${faq.answer}`,
                              sender: 'bot',
                              timestamp: new Date(),
                            };
                            setMessages((prev) => [...prev, faqMessage]);
                          }}
                        >
                          <div className="font-medium">{faq.question}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="pr-12"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default MentorChatbot;
