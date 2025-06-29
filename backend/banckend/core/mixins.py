"""
Core application mixins and utilities for the marketplace project.
"""

from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    `created_at` and `updated_at` fields.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class StandardResultsSetPagination(PageNumberPagination):
    """
    Standard pagination class for consistent API responses.
    """

    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class APIResponseMixin:
    """
    Mixin to provide consistent API response format.
    """

    def success_response(
        self, data=None, message="Success", status_code=status.HTTP_200_OK
    ):
        """
        Return a standardized success response.
        """
        response_data = {"success": True, "message": message, "data": data}
        return Response(response_data, status=status_code)

    def error_response(
        self, message="Error", errors=None, status_code=status.HTTP_400_BAD_REQUEST
    ):
        """
        Return a standardized error response.
        """
        response_data = {"success": False, "message": message, "errors": errors}
        return Response(response_data, status=status_code)
