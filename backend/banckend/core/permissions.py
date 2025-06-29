"""
Core permissions for the marketplace project.
"""

from rest_framework import permissions
from .exceptions import PermissionDeniedException


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the object
        return obj.user == request.user if hasattr(obj, "user") else obj == request.user


class IsStartupOrReadOnly(permissions.BasePermission):
    """
    Permission to only allow startup users to create/edit objects.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and hasattr(request.user, "role")
            and request.user.role == "STARTUP"
        )


class IsAdminOrOwner(permissions.BasePermission):
    """
    Permission to allow admins or owners to access objects.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Admin users can access everything
        if hasattr(request.user, "role") and request.user.role == "ADMIN":
            return True

        # Users can only access their own objects
        return obj.user == request.user if hasattr(obj, "user") else obj == request.user


class RoleBasedPermission(permissions.BasePermission):
    """
    Permission class that checks user roles.
    """

    required_roles = []

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        if hasattr(view, "required_roles"):
            required_roles = view.required_roles
        else:
            required_roles = self.required_roles

        if not required_roles:
            return True

        return request.user.role in required_roles
