"""
Django filters for the marketplace project.
"""

import django_filters
from django.db.models import Q
from .models import Product, Category


class ProductFilter(django_filters.FilterSet):
    """
    Filter class for Product model with price range and category filtering.
    """

    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    category = django_filters.ModelChoiceFilter(
        queryset=Category.objects.filter(is_active=True)
    )
    status = django_filters.ChoiceFilter(choices=Product.ProductStatus.choices)
    featured = django_filters.BooleanFilter()
    in_stock = django_filters.BooleanFilter(method="filter_in_stock")

    class Meta:
        model = Product
        fields = [
            "category",
            "status",
            "featured",
            "min_price",
            "max_price",
            "in_stock",
        ]

    def filter_in_stock(self, queryset, name, value):
        """
        Filter products that are in stock.
        """
        if value:
            return queryset.filter(inventory_count__gt=0)
        return queryset
