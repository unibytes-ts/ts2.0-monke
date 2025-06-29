"""
Chatbot admin configuration.
"""

from django.contrib import admin
from .models import FAQEntry, ChatSession, ChatMessage


@admin.register(FAQEntry)
class FAQEntryAdmin(admin.ModelAdmin):
    list_display = ["question", "category", "priority", "is_active", "created_at"]
    list_filter = ["category", "is_active", "created_at"]
    search_fields = ["question", "answer", "keywords"]
    ordering = ["-priority", "category", "question"]

    fieldsets = (
        ("Question & Answer", {"fields": ("question", "answer")}),
        ("Classification", {"fields": ("category", "keywords", "priority")}),
        ("Status", {"fields": ("is_active",)}),
    )


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ["session_id", "user", "user_role", "is_active", "created_at"]
    list_filter = ["user_role", "is_active", "created_at"]
    search_fields = ["session_id", "user__email"]
    readonly_fields = ["session_id", "created_at", "updated_at"]

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("user")


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ["session", "user_message_preview", "response_type", "created_at"]
    list_filter = ["response_type", "created_at"]
    search_fields = ["user_message", "bot_response"]
    readonly_fields = ["created_at", "updated_at"]

    def user_message_preview(self, obj):
        return (
            obj.user_message[:50] + "..."
            if len(obj.user_message) > 50
            else obj.user_message
        )

    user_message_preview.short_description = "User Message"

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("session", "matched_faq")
