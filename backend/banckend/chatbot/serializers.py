"""
Chatbot serializers for the marketplace project.
"""

from rest_framework import serializers
from .models import FAQEntry, ChatSession, ChatMessage


class FAQEntrySerializer(serializers.ModelSerializer):
    """Serializer for FAQ entries"""

    class Meta:
        model = FAQEntry
        fields = ["id", "question", "answer", "category", "keywords"]


class ChatMessageSerializer(serializers.ModelSerializer):
    """Serializer for chat messages"""

    class Meta:
        model = ChatMessage
        fields = [
            "id",
            "user_message",
            "bot_response",
            "response_type",
            "created_at",
            "matched_faq",
        ]
        read_only_fields = ["created_at"]


class ChatSessionSerializer(serializers.ModelSerializer):
    """Serializer for chat sessions"""

    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ["id", "session_id", "created_at", "messages"]
        read_only_fields = ["created_at"]


class ChatRequestSerializer(serializers.Serializer):
    """Serializer for incoming chat requests"""

    message = serializers.CharField(max_length=1000)
    session_id = serializers.CharField(max_length=100, required=False)


class ChatResponseSerializer(serializers.Serializer):
    """Serializer for chat responses"""

    response = serializers.CharField()
    session_id = serializers.CharField()
    response_type = serializers.CharField()
    suggestions = serializers.ListField(child=serializers.CharField(), required=False)
    category = serializers.CharField(required=False)


class MentorSuggestionSerializer(serializers.Serializer):
    """Serializer for mentor suggestions"""

    suggestions = serializers.ListField(child=serializers.CharField())
    categories = serializers.ListField(child=serializers.CharField())
