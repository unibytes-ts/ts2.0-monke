"""
Marketplace admin configuration for the marketplace project.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import (
    StartupProfile,
    Category,
    Product,
    ProductReview,
    Order,
    OrderItem,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for Category model.
    """

    list_display = [
        "name",
        "description_preview",
        "is_active",
        "product_count",
        "created_at",
    ]
    list_filter = ["is_active", "created_at"]
    search_fields = ["name", "description"]
    ordering = ["name"]

    def description_preview(self, obj):
        """Return a preview of the description."""
        return (
            obj.description[:50] + "..."
            if len(obj.description) > 50
            else obj.description
        )

    description_preview.short_description = "Description Preview"

    def product_count(self, obj):
        """Return the number of products in this category."""
        return obj.products.count()

    product_count.short_description = "Product Count"


@admin.register(StartupProfile)
class StartupProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for StartupProfile model.
    """

    list_display = [
        "company_name",
        "user_email",
        "verified",
        "product_count",
        "founded_date",
        "created_at",
    ]
    list_filter = ["verified", "founded_date", "created_at"]
    search_fields = ["company_name", "user__email", "description"]
    ordering = ["-created_at"]
    actions = ["verify_startups"]

    def user_email(self, obj):
        """Return the user's email."""
        return obj.user.email

    user_email.short_description = "User Email"

    def product_count(self, obj):
        """Return the number of products for this startup."""
        return obj.products.count()

    product_count.short_description = "Product Count"

    def verify_startups(self, request, queryset):
        """Verify selected startup profiles."""
        updated = queryset.update(verified=True)
        self.message_user(request, f"{updated} startup profiles were verified.")

    verify_startups.short_description = "Verify selected startup profiles"


class ProductImageInline(admin.TabularInline):
    """
    Inline admin for product images (if using a separate model in the future).
    """

    extra = 1
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        """Return an image preview."""
        if hasattr(obj, "image_url") and obj.image_url:
            return format_html('<img src="{}" width="50" height="50" />', obj.image_url)
        return "No image"

    image_preview.short_description = "Preview"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Admin configuration for Product model.
    """

    list_display = [
        "name",
        "startup_name",
        "category",
        "price",
        "inventory_count",
        "status",
        "featured",
        "created_at",
    ]
    list_filter = ["status", "featured", "category", "created_at", "startup__verified"]
    search_fields = ["name", "description", "startup__company_name"]
    ordering = ["-created_at"]
    actions = ["make_featured", "make_active"]

    def startup_name(self, obj):
        """Return the startup company name."""
        return obj.startup.company_name

    startup_name.short_description = "Startup"

    def make_featured(self, request, queryset):
        """Make selected products featured."""
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} products were marked as featured.")

    make_featured.short_description = "Mark selected products as featured"

    def make_active(self, request, queryset):
        """Make selected products active."""
        updated = queryset.update(status="ACTIVE")
        self.message_user(request, f"{updated} products were marked as active.")

    make_active.short_description = "Mark selected products as active"


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    """
    Admin configuration for ProductReview model.
    """

    list_display = [
        "product_name",
        "user_email",
        "rating",
        "title",
        "is_verified_purchase",
        "created_at",
    ]
    list_filter = ["rating", "is_verified_purchase", "created_at"]
    search_fields = ["product__name", "user__email", "title", "comment"]
    ordering = ["-created_at"]

    def product_name(self, obj):
        """Return the product name."""
        return obj.product.name

    product_name.short_description = "Product"

    def user_email(self, obj):
        """Return the user's email."""
        return obj.user.email

    user_email.short_description = "User"


class OrderItemInline(admin.TabularInline):
    """
    Inline admin for order items.
    """

    model = OrderItem
    extra = 0
    readonly_fields = ["total_price"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Admin configuration for Order model.
    """

    list_display = [
        "order_number",
        "user_email",
        "status",
        "total_amount",
        "item_count",
        "created_at",
    ]
    list_filter = ["status", "created_at"]
    search_fields = ["order_number", "user__email"]
    ordering = ["-created_at"]
    inlines = [OrderItemInline]
    actions = ["mark_confirmed", "mark_shipped"]

    def user_email(self, obj):
        """Return the user's email."""
        return obj.user.email

    user_email.short_description = "User"

    def item_count(self, obj):
        """Return the number of items in the order."""
        return obj.items.count()

    item_count.short_description = "Items"

    def mark_confirmed(self, request, queryset):
        """Mark selected orders as confirmed."""
        updated = queryset.filter(status="PENDING").update(status="CONFIRMED")
        self.message_user(request, f"{updated} orders were marked as confirmed.")

    mark_confirmed.short_description = "Mark selected orders as confirmed"

    def mark_shipped(self, request, queryset):
        """Mark selected orders as shipped."""
        updated = queryset.filter(status="CONFIRMED").update(status="SHIPPED")
        self.message_user(request, f"{updated} orders were marked as shipped.")

    mark_shipped.short_description = "Mark selected orders as shipped"


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for OrderItem model.
    """

    list_display = [
        "order_number",
        "product_name",
        "quantity",
        "unit_price",
        "total_price",
    ]
    list_filter = ["order__status", "order__created_at"]
    search_fields = ["order__order_number", "product__name"]
    ordering = ["-order__created_at"]

    def order_number(self, obj):
        """Return the order number."""
        return obj.order.order_number

    order_number.short_description = "Order"

    def product_name(self, obj):
        """Return the product name."""
        return obj.product.name

    product_name.short_description = "Product"
