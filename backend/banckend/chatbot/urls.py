"""
Chatbot URL patterns for the marketplace project.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FAQViewSet,
    chat_with_mentor,
    get_mentor_suggestions,
    get_chat_history,
    get_faq_categories,
)

router = DefaultRouter()
router.register(r"faqs", FAQViewSet, basename="faq")

urlpatterns = [
    # Chatbot endpoints
    path("chat/", chat_with_mentor, name="chat-with-mentor"),
    path("suggestions/", get_mentor_suggestions, name="mentor-suggestions"),
    path("history/<str:session_id>/", get_chat_history, name="chat-history"),
    path("categories/", get_faq_categories, name="faq-categories"),
    # FAQ endpoints
    path("", include(router.urls)),
]
