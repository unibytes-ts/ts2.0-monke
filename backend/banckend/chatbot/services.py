"""
Mentor Chatbot Service - Startup guidance for students
"""

import uuid
import re
import random
from typing import Dict, List, Optional
from django.db.models import Q
from .models import FAQEntry, ChatSession, ChatMessage


class MentorChatbotService:
    """AI Mentor for startup guidance and platform help"""

    MENTOR_RESPONSES = {
        "greeting": [
            "Hello! I'm your AI Mentor. I'm here to guide you on your startup journey! 🚀 What would you like to know?",
            "Welcome, future entrepreneur! 👋 I'm here to help you with startup advice, funding tips, and platform guidance.",
            "Hi there! As your mentor, I'm excited to help you build your startup. What's on your mind today?",
        ],
        "fallback": [
            "That's an interesting question! While I specialize in startup guidance, I might not have the perfect answer. Could you try asking about funding, team building, or product development?",
            "I'm still learning! 📚 Could you rephrase that or ask about startup basics, marketing, or how to use our platform?",
            "Great question! I focus on startup mentoring. Try asking about business models, finding co-founders, or getting your first customers.",
        ],
        "goodbye": [
            "Best of luck with your startup journey! 🌟 Remember, every great company started with an idea. Keep pushing forward!",
            "Take care, and remember - persistence is key in entrepreneurship! Come back anytime for more guidance. 💪",
            "Goodbye for now! Keep that entrepreneurial spirit alive, and don't hesitate to reach out when you need mentoring. 🚀",
        ],
        "encouragement": [
            "Every successful entrepreneur started where you are now. Keep learning and building! 💪",
            "Great question! This shows you're thinking like a real entrepreneur. 🧠",
            "I love seeing students interested in startups. You're on the right track! ⭐",
        ],
    }

    def __init__(self):
        self.greeting_patterns = [
            r"\b(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))\b",
            r"\b(start|begin|help|mentor)\b",
        ]

        self.goodbye_patterns = [
            r"\b(bye|goodbye|see\s*you|thanks|thank\s*you|exit|quit)\b"
        ]

    def get_or_create_session(
        self, session_id: Optional[str] = None, user=None
    ) -> ChatSession:
        """Get existing session or create new one"""
        if not session_id:
            session_id = str(uuid.uuid4())

        session, created = ChatSession.objects.get_or_create(
            session_id=session_id,
            defaults={
                "user": user,
                "user_role": (
                    getattr(user, "role", "ANONYMOUS") if user else "ANONYMOUS"
                ),
                "is_active": True,
            },
        )
        return session

    def normalize_text(self, text: str) -> str:
        """Normalize text for matching"""
        return re.sub(r"[^\w\s]", "", text.lower().strip())

    def is_greeting(self, message: str) -> bool:
        """Check if message is a greeting"""
        normalized = self.normalize_text(message)
        return any(
            re.search(pattern, normalized, re.IGNORECASE)
            for pattern in self.greeting_patterns
        )

    def is_goodbye(self, message: str) -> bool:
        """Check if message is a goodbye"""
        normalized = self.normalize_text(message)
        return any(
            re.search(pattern, normalized, re.IGNORECASE)
            for pattern in self.goodbye_patterns
        )

    def find_best_faq_match(self, message: str) -> Optional[FAQEntry]:
        """Find best matching FAQ entry using keyword and content matching"""
        normalized_message = self.normalize_text(message)

        faqs = FAQEntry.objects.filter(is_active=True).order_by("-priority")

        best_match = None
        highest_score = 0

        for faq in faqs:
            score = 0

            # Keyword matching (weighted heavily)
            keywords = [
                kw.strip().lower() for kw in faq.keywords.split(",") if kw.strip()
            ]
            for keyword in keywords:
                if keyword in normalized_message:
                    score += 3  # High weight for keyword matches

            # Question content matching
            question_words = set(self.normalize_text(faq.question).split())
            message_words = set(normalized_message.split())
            common_words = question_words & message_words
            score += len(common_words)

            # Priority boost
            score += faq.priority * 0.5

            if score > highest_score and score > 2:  # Minimum threshold
                highest_score = score
                best_match = faq

        return best_match

    def get_startup_suggestions(self, category: str = None) -> List[str]:
        """Get mentor suggestions based on category"""
        suggestions = {
            "startup_basics": [
                "How do I validate my startup idea?",
                "What makes a good business model?",
                "How do I know if there's market demand?",
            ],
            "funding": [
                "How do I raise seed funding?",
                "What do investors look for?",
                "How much equity should I give up?",
            ],
            "team_building": [
                "How do I find a co-founder?",
                "What skills should my team have?",
                "How do I hire the right people?",
            ],
            "product_development": [
                "How do I build an MVP?",
                "What features should I build first?",
                "How do I get user feedback?",
            ],
            "general": [
                "How do I get started with my startup?",
                "What's the biggest mistake new entrepreneurs make?",
                "How do I stay motivated?",
                "Tell me about startup funding",
                "How do I build a team?",
            ],
        }

        if category and category in suggestions:
            return suggestions[category]

        return suggestions["general"]

    def add_mentor_touch(self, response: str, user_role: str = None) -> str:
        """Add encouraging mentor-like touch to responses"""
        if user_role == "STUDENT":
            encouragements = [
                "\n\n💡 Pro tip: Start small and iterate based on user feedback!",
                "\n\n🚀 Remember: Every expert was once a beginner. Keep learning!",
                "\n\n⭐ You're asking the right questions - that's entrepreneurial thinking!",
            ]
            return response + random.choice(encouragements)

        return response

    def process_message(
        self, message: str, session_id: Optional[str] = None, user=None
    ) -> Dict:
        """Process user message and return mentor response"""
        session = self.get_or_create_session(session_id, user)

        # Determine response
        response_data = self._generate_response(message, session)

        # Store the conversation
        ChatMessage.objects.create(
            session=session,
            user_message=message,
            bot_response=response_data["response"],
            response_type=response_data["response_type"],
            matched_faq=response_data.get("matched_faq"),
        )

        # Add mentor touch for students
        if session.user_role == "STUDENT":
            response_data["response"] = self.add_mentor_touch(
                response_data["response"], session.user_role
            )

        response_data["session_id"] = session.session_id
        return response_data

    def _generate_response(self, message: str, session: ChatSession) -> Dict:
        """Generate appropriate response based on message content"""

        # Check for greeting
        if self.is_greeting(message):
            return {
                "response": random.choice(self.MENTOR_RESPONSES["greeting"]),
                "response_type": "greeting",
                "suggestions": self.get_startup_suggestions(),
                "category": "general",
            }

        # Check for goodbye
        if self.is_goodbye(message):
            return {
                "response": random.choice(self.MENTOR_RESPONSES["goodbye"]),
                "response_type": "goodbye",
                "suggestions": [],
            }

        # Try to find FAQ match
        faq_match = self.find_best_faq_match(message)
        if faq_match:
            return {
                "response": faq_match.answer,
                "response_type": "faq_match",
                "suggestions": self.get_startup_suggestions(faq_match.category),
                "category": faq_match.category,
                "matched_faq": faq_match,
            }

        # Fallback response
        return {
            "response": random.choice(self.MENTOR_RESPONSES["fallback"]),
            "response_type": "fallback",
            "suggestions": self.get_startup_suggestions(),
            "category": "general",
        }

    def get_chat_history(self, session_id: str) -> List[Dict]:
        """Get chat history for a session"""
        try:
            session = ChatSession.objects.get(session_id=session_id)
            messages = session.messages.all().order_by("created_at")

            return [
                {
                    "user_message": msg.user_message,
                    "bot_response": msg.bot_response,
                    "timestamp": msg.created_at.isoformat(),
                    "response_type": msg.response_type,
                }
                for msg in messages
            ]
        except ChatSession.DoesNotExist:
            return []
