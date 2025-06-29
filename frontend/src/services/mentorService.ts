const API_BASE_URL = '/api/mentor';

export type Suggestion = {
  id: number;
  text: string;
};

export type FAQCategory = {
  id: number;
  name: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: number;
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

export type ChatSession = {
  id: string;
  title: string;
  last_message: string;
  updated_at: string;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const mentorService = {
  // Send a message to the chatbot
  async sendMessage(message: string, sessionId?: string): Promise<{ response: string; session_id: string }> {
    const response = await fetch(`${API_BASE_URL}/chat/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        message,
        ...(sessionId && { session_id: sessionId })
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return response.json();
  },

  // Get chat history for a session
  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    const response = await fetch(`${API_BASE_URL}/history/${sessionId}/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }
    
    return response.json();
  },

  // Get all chat sessions
  async getChatSessions(): Promise<ChatSession[]> {
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch chat sessions');
    }
    
    return response.json();
  },

  // Get suggested questions
  async getSuggestions(): Promise<Suggestion[]> {
    const response = await fetch(`${API_BASE_URL}/suggestions/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    
    return response.json();
  },

  // Get FAQ categories
  async getCategories(): Promise<FAQCategory[]> {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch FAQ categories');
    }
    
    return response.json();
  },

  // Get FAQs by category
  async getFAQs(categoryId: number): Promise<FAQ[]> {
    const response = await fetch(`${API_BASE_URL}/faqs/?category=${categoryId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }
    
    return response.json();
  },
};
