"""
Marketplace serializers for the marketplace project.
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction
from drf_spectacular.utils import extend_schema_field
from .models import StartupProfile, Category, Product, ProductReview, Order, OrderItem
from users.serializers import UserSerializer
import uuid

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """

    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "description",
            "is_active",
            "product_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    @extend_schema_field(serializers.IntegerField)
    def get_product_count(self, obj):
        """Get the number of active products in this category."""
        return obj.products.filter(status="ACTIVE").count()


class StartupProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for StartupProfile model.
    """

    user = UserSerializer(read_only=True)
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = StartupProfile
        fields = [
            "id",
            "user",
            "company_name",
            "website",
            "logo_url",
            "description",
            "founded_date",
            "verified",
            "product_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "verified", "created_at", "updated_at"]

    @extend_schema_field(serializers.IntegerField)
    def get_product_count(self, obj):
        """Get the number of products for this startup."""
        return obj.products.filter(status="ACTIVE").count()

    def validate(self, attrs):
        """
        Validate that the user has startup role.
        """
        request = self.context.get("request")
        if request and request.user.role != "STARTUP":
            raise serializers.ValidationError(
                "Only users with startup role can create startup profiles."
            )
        return attrs


class ProductListSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model (list view).
    """

    startup_name = serializers.CharField(source="startup.company_name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "inventory_count",
            "image_urls",
            "status",
            "featured",
            "startup_name",
            "category_name",
            "average_rating",
            "review_count",
            "created_at",
            "updated_at",
        ]

    def get_average_rating(self, obj):
        """Calculate average rating for the product."""
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(review.rating for review in reviews) / len(reviews), 1)
        return 0

    def get_review_count(self, obj):
        """Get the number of reviews for the product."""
        return obj.reviews.count()


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model (detail view).
    """

    startup = StartupProfileSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(
        write_only=True, required=False, allow_null=True
    )
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "startup",
            "category",
            "category_id",
            "name",
            "description",
            "price",
            "inventory_count",
            "image_urls",
            "status",
            "featured",
            "average_rating",
            "review_count",
            "reviews",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "startup", "created_at", "updated_at"]

    def get_average_rating(self, obj):
        """Calculate average rating for the product."""
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(review.rating for review in reviews) / len(reviews), 1)
        return 0

    def get_review_count(self, obj):
        """Get the number of reviews for the product."""
        return obj.reviews.count()

    def get_reviews(self, obj):
        """Get recent reviews for the product."""
        reviews = obj.reviews.all()[:5]  # Get latest 5 reviews
        return ProductReviewSerializer(reviews, many=True).data


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating products.
    """

    category_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            "category_id",
            "name",
            "description",
            "price",
            "inventory_count",
            "image_urls",
            "status",
            "featured",
        ]

    def validate_category_id(self, value):
        """Validate category exists and is active."""
        if value:
            try:
                category = Category.objects.get(id=value, is_active=True)
                return value
            except Category.DoesNotExist:
                raise serializers.ValidationError("Invalid category selected.")
        return value

    def validate_price(self, value):
        """Validate price is positive."""
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than 0.")
        return value

    def validate_inventory_count(self, value):
        """Validate inventory count is non-negative."""
        if value < 0:
            raise serializers.ValidationError("Inventory count cannot be negative.")
        return value


class ProductReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for ProductReview model.
    """

    user = UserSerializer(read_only=True)
    user_name = serializers.CharField(source="user.full_name", read_only=True)

    class Meta:
        model = ProductReview
        fields = [
            "id",
            "user",
            "user_name",
            "rating",
            "title",
            "comment",
            "is_verified_purchase",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "is_verified_purchase",
            "created_at",
            "updated_at",
        ]

    def validate_rating(self, value):
        """Validate rating is between 1 and 5."""
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value


class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for OrderItem model.
    """

    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_id",
            "quantity",
            "unit_price",
            "total_price",
        ]
        read_only_fields = ["id", "unit_price", "total_price"]

    def validate_product_id(self, value):
        """Validate product exists and is available."""
        try:
            product = Product.objects.get(id=value)
            if not product.is_available:
                raise serializers.ValidationError("Product is not available.")
            return value
        except Product.DoesNotExist:
            raise serializers.ValidationError("Invalid product selected.")

    def validate_quantity(self, value):
        """Validate quantity is positive."""
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0.")
        return value


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Order model.
    """

    user = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    order_items = OrderItemSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "order_number",
            "status",
            "total_amount",
            "shipping_address",
            "notes",
            "items",
            "order_items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "order_number",
            "total_amount",
            "created_at",
            "updated_at",
        ]

    def validate_order_items(self, value):
        """Validate order items."""
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")

        # Check for duplicate products
        product_ids = [item["product_id"] for item in value]
        if len(product_ids) != len(set(product_ids)):
            raise serializers.ValidationError("Duplicate products in order.")

        return value

    def validate_shipping_address(self, value):
        """Validate shipping address contains required fields."""
        required_fields = ["street", "city", "state", "postal_code", "country"]
        for field in required_fields:
            if field not in value or not value[field]:
                raise serializers.ValidationError(
                    f"Shipping address must contain {field}."
                )
        return value

    @transaction.atomic
    def create(self, validated_data):
        """Create order with items."""
        order_items_data = validated_data.pop("order_items")

        # Generate unique order number
        validated_data["order_number"] = f"ORD-{uuid.uuid4().hex[:8].upper()}"

        # Calculate total amount
        total_amount = 0
        for item_data in order_items_data:
            product = Product.objects.get(id=item_data["product_id"])
            total_amount += product.price * item_data["quantity"]

        validated_data["total_amount"] = total_amount

        # Create order
        order = Order.objects.create(**validated_data)

        # Create order items
        for item_data in order_items_data:
            product = Product.objects.get(id=item_data["product_id"])
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item_data["quantity"],
                unit_price=product.price,
            )

            # Update product inventory
            product.inventory_count -= item_data["quantity"]
            product.save()

        return order
