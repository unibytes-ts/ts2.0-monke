"""
User URL patterns for the marketplace project.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserRegistrationView,
    CustomTokenObtainPairView,
    verify_email,
    UserViewSet,
    ProfileViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"profiles", ProfileViewSet)

urlpatterns = [
    # Authentication endpoints
    path("auth/register/", UserRegistrationView.as_view(), name="user-register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/verify-email/", verify_email, name="verify-email"),
    # User and profile endpoints
    path("", include(router.urls)),
]
