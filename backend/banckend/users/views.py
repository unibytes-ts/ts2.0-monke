"""
User views for the marketplace project.
"""

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from drf_spectacular.openapi import OpenApiTypes
import logging

from .models import Profile, EmailVerificationToken
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserSerializer,
    ProfileSerializer,
    EmailVerificationSerializer,
    PasswordChangeSerializer,
)
from core.mixins import APIResponseMixin
from core.permissions import IsOwnerOrReadOnly
from core.exceptions import ValidationException, NotFoundError

User = get_user_model()
logger = logging.getLogger(__name__)


class UserRegistrationView(APIResponseMixin, generics.CreateAPIView):
    """
    API view for user registration.
    """

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST"))
    def post(self, request, *args, **kwargs):
        """
        Register a new user with rate limiting.
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"New user registered: {user.email}")

            return self.success_response(
                data={"user_id": user.id, "email": user.email},
                message="User registered successfully. Please check your email for verification.",
                status_code=status.HTTP_201_CREATED,
            )

        logger.warning(f"User registration failed: {serializer.errors}")
        return self.error_response(
            message="Registration failed",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class CustomTokenObtainPairView(APIResponseMixin, TokenObtainPairView):
    """
    Custom JWT token obtain view with rate limiting.
    """

    serializer_class = UserLoginSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST"))
    def post(self, request, *args, **kwargs):
        """
        Obtain JWT tokens with rate limiting.
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            logger.info(f"User logged in: {user.email}")

            return self.success_response(
                data={
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": UserSerializer(user).data,
                },
                message="Login successful",
            )

        logger.warning(f"Login failed: {serializer.errors}")
        return self.error_response(
            message="Login failed",
            errors=serializer.errors,
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


@extend_schema(
    parameters=[
        OpenApiParameter(
            name="token",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Email verification token",
            required=True,
        )
    ],
    responses={
        200: OpenApiResponse(description="Email verified successfully"),
        400: OpenApiResponse(description="Invalid or missing token"),
    },
)
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
@ratelimit(key="ip", rate="10/m", method="GET")
def verify_email(request):
    """
    Verify user email with token.
    """
    token = request.query_params.get("token")

    if not token:
        return Response(
            {"success": False, "message": "Verification token is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer = EmailVerificationSerializer(data={"token": token})

    if serializer.is_valid():
        verification_token = serializer.validated_data["token"]
        user = verification_token.user

        # Mark user as verified
        user.is_verified = True
        user.save()

        # Mark token as used
        verification_token.is_used = True
        verification_token.save()

        logger.info(f"Email verified for user: {user.email}")

        return Response(
            {"success": True, "message": "Email verified successfully"},
            status=status.HTTP_200_OK,
        )

    return Response(
        {
            "success": False,
            "message": "Email verification failed",
            "errors": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


class UserViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for user management.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Filter queryset based on user permissions.
        """
        if self.request.user.role == "ADMIN":
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=["get"])
    def me(self, request):
        """
        Get current user details.
        """
        serializer = self.get_serializer(request.user)
        return self.success_response(data=serializer.data)

    @action(detail=False, methods=["post"])
    def change_password(self, request):
        """
        Change user password.
        """
        serializer = PasswordChangeSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data["new_password"])
            user.save()

            logger.info(f"Password changed for user: {user.email}")

            return self.success_response(message="Password changed successfully")

        return self.error_response(
            message="Password change failed", errors=serializer.errors
        )


class ProfileViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for user profile management.
    """

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Filter queryset based on user permissions.
        """
        if self.request.user.role == "ADMIN":
            return Profile.objects.all()
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Create profile for current user.
        """
        serializer.save(user=self.request.user)
