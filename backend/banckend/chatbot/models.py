"""
Chatbot models for the marketplace project - Mentor Bot for Startup Guidance
"""

from django.db import models
from django.contrib.auth import get_user_model
from core.mixins import TimeStampedModel

User = get_user_model()


class FAQEntry(models.Model):
    """FAQ entries for the mentor chatbot"""

    question = models.CharField(
        max_length=500, help_text="The question that users might ask"
    )
    answer = models.TextField(help_text="The mentor's response")
    keywords = models.CharField(
        max_length=300,
        help_text="Comma-separated keywords for matching (e.g., startup,funding,team)",
    )
    category = models.CharField(
        max_length=50,
        choices=[
            ("startup_basics", "Startup Basics"),
            ("funding", "Funding & Investment"),
            ("team_building", "Team Building"),
            ("product_development", "Product Development"),
            ("marketing", "Marketing & Sales"),
            ("legal", "Legal & Compliance"),
            ("general", "General Guidance"),
            ("platform", "Platform Usage"),
        ],
        default="general",
    )
    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(
        default=1, help_text="Higher priority = more likely to be shown"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-priority", "question"]
        verbose_name = "FAQ Entry"
        verbose_name_plural = "FAQ Entries"

    def __str__(self):
        return f"[{self.category}] {self.question[:50]}..."


class ChatSession(TimeStampedModel):
    """Track chat sessions with the mentor bot"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, unique=True)
    user_role = models.CharField(
        max_length=20, blank=True
    )  # Store user role for context
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Chat Session"
        verbose_name_plural = "Chat Sessions"

    def __str__(self):
        return f"Session {self.session_id} - {self.user or 'Anonymous'}"


class ChatMessage(TimeStampedModel):
    """Store chat messages and responses"""

    session = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="messages"
    )
    user_message = models.TextField()
    bot_response = models.TextField()
    matched_faq = models.ForeignKey(
        FAQEntry, on_delete=models.SET_NULL, null=True, blank=True
    )
    response_type = models.CharField(
        max_length=20,
        choices=[
            ("faq_match", "FAQ Match"),
            ("greeting", "Greeting"),
            ("fallback", "Fallback"),
            ("goodbye", "Goodbye"),
        ],
        default="faq_match",
    )

    class Meta:
        ordering = ["created_at"]
        verbose_name = "Chat Message"
        verbose_name_plural = "Chat Messages"

    def __str__(self):
        return f"{self.session.session_id}: {self.user_message[:30]}..."
