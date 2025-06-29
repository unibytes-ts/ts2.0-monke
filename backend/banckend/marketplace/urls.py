"""
Marketplace URL patterns for the marketplace project.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    StartupProfileViewSet,
    ProductViewSet,
    ProductReviewViewSet,
    OrderViewSet,
)

router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"startup-profiles", StartupProfileViewSet)
router.register(r"products", ProductViewSet)
router.register(r"reviews", ProductReviewViewSet)
router.register(r"orders", OrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
