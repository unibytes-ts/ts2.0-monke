"""
Marketplace models for the marketplace project.
"""

from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from core.mixins import TimeStampedModel
import json

User = get_user_model()


class StartupProfile(TimeStampedModel):
    """
    Startup profile model for marketplace users with startup role.
    """

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="startup_profile",
        limit_choices_to={"role": "STARTUP"},
    )
    company_name = models.CharField(
        max_length=200, help_text=_("Name of the startup company")
    )
    website = models.URLField(blank=True, help_text=_("Company website URL"))
    logo_url = models.URLField(blank=True, help_text=_("URL to company logo image"))
    description = models.TextField(
        max_length=1000, blank=True, help_text=_("Brief description of the startup")
    )
    founded_date = models.DateField(
        null=True, blank=True, help_text=_("Date when the startup was founded")
    )
    verified = models.BooleanField(
        default=False, help_text=_("Whether the startup is verified by admin")
    )

    class Meta:
        verbose_name = _("Startup Profile")
        verbose_name_plural = _("Startup Profiles")

    def __str__(self):
        return f"{self.company_name} ({self.user.email})"


class Category(TimeStampedModel):
    """
    Product category model.
    """

    name = models.CharField(max_length=100, unique=True, help_text=_("Category name"))
    description = models.TextField(
        max_length=500, blank=True, help_text=_("Category description")
    )
    is_active = models.BooleanField(
        default=True, help_text=_("Whether this category is active")
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    """
    Product model for marketplace items.
    """

    class ProductStatus(models.TextChoices):
        DRAFT = "DRAFT", _("Draft")
        ACTIVE = "ACTIVE", _("Active")
        INACTIVE = "INACTIVE", _("Inactive")
        OUT_OF_STOCK = "OUT_OF_STOCK", _("Out of Stock")

    startup = models.ForeignKey(
        StartupProfile, on_delete=models.CASCADE, related_name="products"
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, related_name="products"
    )
    name = models.CharField(max_length=200, help_text=_("Product name"))
    description = models.TextField(help_text=_("Product description"))
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Product price"),
    )
    inventory_count = models.PositiveIntegerField(
        default=0, help_text=_("Available inventory count")
    )
    image_urls = models.JSONField(
        default=list, blank=True, help_text=_("List of product image URLs")
    )
    status = models.CharField(
        max_length=20,
        choices=ProductStatus.choices,
        default=ProductStatus.DRAFT,
        help_text=_("Product status"),
    )
    featured = models.BooleanField(
        default=False, help_text=_("Whether this product is featured")
    )

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "featured"]),
            models.Index(fields=["category", "status"]),
            models.Index(fields=["startup", "status"]),
        ]

    def __str__(self):
        return f"{self.name} - {self.startup.company_name}"

    @property
    def is_available(self):
        """Check if product is available for purchase."""
        return self.status == self.ProductStatus.ACTIVE and self.inventory_count > 0

    def add_image_url(self, url):
        """Add an image URL to the product."""
        if url not in self.image_urls:
            self.image_urls.append(url)
            self.save()

    def remove_image_url(self, url):
        """Remove an image URL from the product."""
        if url in self.image_urls:
            self.image_urls.remove(url)
            self.save()


class ProductReview(TimeStampedModel):
    """
    Product review model.
    """

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="product_reviews"
    )
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text=_("Rating from 1 to 5"),
    )
    title = models.CharField(max_length=200, blank=True, help_text=_("Review title"))
    comment = models.TextField(blank=True, help_text=_("Review comment"))
    is_verified_purchase = models.BooleanField(
        default=False, help_text=_("Whether this review is from a verified purchase")
    )

    class Meta:
        verbose_name = _("Product Review")
        verbose_name_plural = _("Product Reviews")
        unique_together = ["product", "user"]
        ordering = ["-created_at"]

    def __str__(self):
        return f"Review by {self.user.email} for {self.product.name}"


class Order(TimeStampedModel):
    """
    Order model for marketplace transactions.
    """

    class OrderStatus(models.TextChoices):
        PENDING = "PENDING", _("Pending")
        CONFIRMED = "CONFIRMED", _("Confirmed")
        SHIPPED = "SHIPPED", _("Shipped")
        DELIVERED = "DELIVERED", _("Delivered")
        CANCELLED = "CANCELLED", _("Cancelled")
        REFUNDED = "REFUNDED", _("Refunded")

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    order_number = models.CharField(
        max_length=50, unique=True, help_text=_("Unique order number")
    )
    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
        default=OrderStatus.PENDING,
        help_text=_("Order status"),
    )
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Total order amount"),
    )
    shipping_address = models.JSONField(help_text=_("Shipping address details"))
    notes = models.TextField(blank=True, help_text=_("Order notes"))

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order {self.order_number} by {self.user.email}"


class OrderItem(TimeStampedModel):
    """
    Order item model for individual products in an order.
    """

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="order_items"
    )
    quantity = models.PositiveIntegerField(
        validators=[MinValueValidator(1)], help_text=_("Quantity ordered")
    )
    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Unit price at time of order"),
    )

    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")
        unique_together = ["order", "product"]

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.order.order_number}"

    @property
    def total_price(self):
        """Calculate total price for this order item."""
        return self.quantity * self.unit_price
