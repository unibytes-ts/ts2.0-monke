"""
Custom exceptions for the marketplace project.
"""

from rest_framework import status
from rest_framework.views import exception_handler
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)


class MarketplaceException(Exception):
    """Base exception class for marketplace-specific errors."""

    default_message = "An error occurred"
    default_code = "error"
    status_code = status.HTTP_400_BAD_REQUEST

    def __init__(self, message=None, code=None):
        self.message = message or self.default_message
        self.code = code or self.default_code
        super().__init__(self.message)


class PermissionDeniedException(MarketplaceException):
    """Raised when a user doesn't have permission for an action."""

    default_message = "You do not have permission to perform this action"
    default_code = "permission_denied"
    status_code = status.HTTP_403_FORBIDDEN


class ValidationException(MarketplaceException):
    """Raised when validation fails."""

    default_message = "Validation failed"
    default_code = "validation_error"
    status_code = status.HTTP_400_BAD_REQUEST


class NotFoundError(MarketplaceException):
    """Raised when a resource is not found."""

    default_message = "Resource not found"
    default_code = "not_found"
    status_code = status.HTTP_404_NOT_FOUND


def custom_exception_handler(exc, context):
    """
    Custom exception handler that provides consistent error responses.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    # Log the exception
    logger.error(f"Exception occurred: {exc}", extra={"context": context})

    if response is not None:
        if isinstance(exc, MarketplaceException):
            custom_response_data = {
                "success": False,
                "message": exc.message,
                "code": exc.code,
                "errors": None,
            }
        else:
            custom_response_data = {
                "success": False,
                "message": "An error occurred",
                "errors": response.data,
            }

        response.data = custom_response_data

    return response
