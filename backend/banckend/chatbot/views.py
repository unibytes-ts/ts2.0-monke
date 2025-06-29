"""
Chatbot views for the marketplace project.
"""

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import FAQEntry, ChatSession
from .serializers import (
    ChatRequestSerializer,
    ChatResponseSerializer,
    FAQEntrySerializer,
    ChatSessionSerializer,
    MentorSuggestionSerializer,
)
from .services import MentorChatbotService


class FAQViewSet(ReadOnlyModelViewSet):
    """ViewSet for browsing FAQ entries"""

    queryset = FAQEntry.objects.filter(is_active=True).order_by("-priority", "question")
    serializer_class = FAQEntrySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


@extend_schema(
    request=ChatRequestSerializer,
    responses={
        200: ChatResponseSerializer,
        400: OpenApiResponse(description="Bad request"),
        429: OpenApiResponse(description="Rate limited"),
    },
    description="Chat with the AI Mentor for startup guidance",
)
@api_view(["POST"])
@permission_classes([permissions.AllowAny])
@ratelimit(key="ip", rate="30/m", method="POST")
def chat_with_mentor(request):
    """
    Chat endpoint for the AI Mentor Bot.
    Provides startup guidance, platform help, and entrepreneurial advice.
    """
    serializer = ChatRequestSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {"error": "Invalid request", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    message = serializer.validated_data["message"]
    session_id = serializer.validated_data.get("session_id")
    user = request.user if request.user.is_authenticated else None

    # Process message with mentor bot
    chatbot_service = MentorChatbotService()
    response_data = chatbot_service.process_message(message, session_id, user)

    # Serialize response
    response_serializer = ChatResponseSerializer(data=response_data)
    if response_serializer.is_valid():
        return Response(response_serializer.data, status=status.HTTP_200_OK)

    return Response(
        {"error": "Failed to process response"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@extend_schema(
    responses={200: MentorSuggestionSerializer},
    description="Get mentor suggestions and available categories",
)
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_mentor_suggestions(request):
    """
    Get suggestions for questions to ask the mentor and available categories.
    """
    chatbot_service = MentorChatbotService()

    # Get suggestions by category
    categories = [
        "startup_basics",
        "funding",
        "team_building",
        "product_development",
        "marketing",
        "general",
    ]

    suggestions = chatbot_service.get_startup_suggestions("general")

    data = {"suggestions": suggestions, "categories": categories}

    serializer = MentorSuggestionSerializer(data=data)
    if serializer.is_valid():
        return Response(serializer.data)

    return Response({"error": "Failed to get suggestions"}, status=500)


@extend_schema(
    responses={200: ChatSessionSerializer},
    description="Get chat history for a session (public access for guests)",
)
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_chat_history(request, session_id):
    """
    Get chat history for a specific session.
    Public access - anyone can view any session for hackathon demo purposes.
    """
    try:
        session = ChatSession.objects.get(session_id=session_id)
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data)

    except ChatSession.DoesNotExist:
        return Response(
            {"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )


@extend_schema(
    responses={200: {"description": "Categories list"}},
    description="Get available FAQ categories with proper deduplication",
)
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_faq_categories(request):
    """
    Get list of available FAQ categories with counts.
    """
    from django.db.models import Count

    # Get unique categories with their counts
    categories_data = (
        FAQEntry.objects.filter(is_active=True)
        .values("category")
        .annotate(count=Count("id"))
        .order_by("category")
    )

    category_display = {
        "startup_basics": "Startup Basics",
        "funding": "Funding & Investment",
        "team_building": "Team Building",
        "product_development": "Product Development",
        "marketing": "Marketing & Sales",
        "legal": "Legal & Compliance",
        "general": "General Guidance",
        "platform": "Platform Usage",
    }

    result = [
        {
            "key": cat_data["category"],
            "display_name": category_display.get(
                cat_data["category"], cat_data["category"].replace("_", " ").title()
            ),
            "count": cat_data["count"],
        }
        for cat_data in categories_data
    ]

    return Response({"categories": result})
