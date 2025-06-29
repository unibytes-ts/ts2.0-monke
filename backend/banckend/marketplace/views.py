"""
Marketplace views for the marketplace project.
"""

from rest_framework import status, generics, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied, ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Avg
from django.contrib.auth import get_user_model
import logging

from .models import StartupProfile, Category, Product, ProductReview, Order, OrderItem
from .serializers import (
    StartupProfileSerializer,
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer,
    ProductCreateUpdateSerializer,
    ProductReviewSerializer,
    OrderSerializer,
    OrderItemSerializer,
)
from .filters import ProductFilter
from core.mixins import APIResponseMixin
from core.permissions import IsStartupOrReadOnly, IsOwnerOrReadOnly, IsAdminOrOwner

User = get_user_model()
logger = logging.getLogger(__name__)


class CategoryViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for Category management.
    """

    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [permissions.IsAuthenticated]
            # Only admin users can manage categories
            if hasattr(self.request, "user") and self.request.user.role != "ADMIN":
                permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]

        return [permission() for permission in permission_classes]


class StartupProfileViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for StartupProfile management.
    """

    queryset = StartupProfile.objects.all()
    serializer_class = StartupProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["company_name", "description"]
    ordering_fields = ["company_name", "created_at", "verified"]
    ordering = ["-verified", "company_name"]

    def get_queryset(self):
        """
        Filter queryset based on user permissions.
        """
        queryset = super().get_queryset()

        if self.request.user.role == "ADMIN":
            return queryset
        elif self.request.user.role == "STARTUP":
            return queryset.filter(user=self.request.user)
        else:
            # Non-startup users can only see verified profiles
            return queryset.filter(verified=True)

    def perform_create(self, serializer):
        """
        Create startup profile for current user.
        """
        if self.request.user.role != "STARTUP":
            raise PermissionDenied("Only startup users can create startup profiles.")

        # Check if user already has a startup profile
        if hasattr(self.request.user, "startup_profile"):
            raise ValidationError("User already has a startup profile.")

        serializer.save(user=self.request.user)
        logger.info(f"Startup profile created for user: {self.request.user.email}")

    @action(detail=True, methods=["post"])
    def verify(self, request, pk=None):
        """
        Verify a startup profile (admin only).
        """
        if request.user.role != "ADMIN":
            return self.error_response(
                message="Only admin users can verify startup profiles.",
                status_code=status.HTTP_403_FORBIDDEN,
            )

        startup_profile = self.get_object()
        startup_profile.verified = True
        startup_profile.save()

        logger.info(f"Startup profile verified: {startup_profile.company_name}")

        return self.success_response(message="Startup profile verified successfully.")


class ProductViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for Product management with filtering and search.
    """

    queryset = Product.objects.select_related("startup", "category").prefetch_related(
        "reviews"
    )
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter
    search_fields = ["name", "description", "startup__company_name"]
    ordering_fields = ["name", "price", "created_at", "featured"]
    ordering = ["-featured", "-created_at"]

    def get_serializer_class(self):
        """
        Return appropriate serializer based on action.
        """
        if self.action == "list":
            return ProductListSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return ProductCreateUpdateSerializer
        else:
            return ProductDetailSerializer

    def get_queryset(self):
        """
        Filter queryset based on user permissions and product status.
        """
        queryset = super().get_queryset()

        if self.request.user.is_authenticated and self.request.user.role == "ADMIN":
            return queryset
        elif self.request.user.is_authenticated and self.request.user.role == "STARTUP":
            # Startup users can see their own products and active products from others
            own_products = Q(startup__user=self.request.user)
            active_products = Q(status="ACTIVE")
            return queryset.filter(own_products | active_products)
        else:
            # Anonymous and non-startup users can only see active products
            return queryset.filter(status="ACTIVE")

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [permissions.IsAuthenticated, IsStartupOrReadOnly]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """
        Create product for current user's startup.
        """
        if not hasattr(self.request.user, "startup_profile"):
            raise ValidationError(
                "User must have a startup profile to create products."
            )

        category_id = serializer.validated_data.get("category_id")
        category = None
        if category_id:
            try:
                category = Category.objects.get(id=category_id, is_active=True)
            except Category.DoesNotExist:
                raise ValidationError("Invalid category selected.")

        serializer.save(startup=self.request.user.startup_profile, category=category)
        logger.info(f"Product created: {serializer.instance.name}")

    def perform_update(self, serializer):
        """
        Update product, ensuring user owns the product.
        """
        product = self.get_object()

        if (
            self.request.user.role != "ADMIN"
            and product.startup.user != self.request.user
        ):
            raise PermissionDenied("You can only update your own products.")

        category_id = serializer.validated_data.get("category_id")
        if category_id:
            try:
                category = Category.objects.get(id=category_id, is_active=True)
                serializer.save(category=category)
            except Category.DoesNotExist:
                raise ValidationError("Invalid category selected.")
        else:
            serializer.save()

        logger.info(f"Product updated: {serializer.instance.name}")

    @action(detail=True, methods=["post"])
    def add_review(self, request, pk=None):
        """
        Add a review to a product.
        """
        product = self.get_object()

        # Check if user already reviewed this product
        if ProductReview.objects.filter(product=product, user=request.user).exists():
            return self.error_response(
                message="You have already reviewed this product.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ProductReviewSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(product=product, user=request.user)
            logger.info(f"Review added for product: {product.name}")

            return self.success_response(
                data=serializer.data,
                message="Review added successfully.",
                status_code=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Review creation failed", errors=serializer.errors
        )

    @action(detail=True, methods=["get"])
    def reviews(self, request, pk=None):
        """
        Get all reviews for a product.
        """
        product = self.get_object()
        reviews = product.reviews.all()

        # Apply pagination
        page = self.paginate_queryset(reviews)
        if page is not None:
            serializer = ProductReviewSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductReviewSerializer(reviews, many=True)
        return self.success_response(data=serializer.data)


class ProductReviewViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for ProductReview management.
    """

    queryset = ProductReview.objects.select_related("product", "user")
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["rating", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        """
        Filter queryset based on user permissions.
        """
        if self.request.user.role == "ADMIN":
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Create review for current user.
        """
        serializer.save(user=self.request.user)


class OrderViewSet(APIResponseMixin, ModelViewSet):
    """
    ViewSet for Order management.
    """

    queryset = Order.objects.select_related("user").prefetch_related("items__product")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "status", "total_amount"]
    ordering = ["-created_at"]

    def get_queryset(self):
        """
        Filter queryset based on user permissions.
        """
        if self.request.user.role == "ADMIN":
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Create order for current user.
        """
        serializer.save(user=self.request.user)
        logger.info(f"Order created: {serializer.instance.order_number}")

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        """
        Cancel an order.
        """
        order = self.get_object()

        if order.status not in ["PENDING", "CONFIRMED"]:
            return self.error_response(
                message="Order cannot be cancelled at this stage.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        order.status = "CANCELLED"
        order.save()

        # Restore product inventory
        for item in order.items.all():
            item.product.inventory_count += item.quantity
            item.product.save()

        logger.info(f"Order cancelled: {order.order_number}")

        return self.success_response(message="Order cancelled successfully.")
