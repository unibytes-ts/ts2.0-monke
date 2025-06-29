"""
User admin configuration for the marketplace project.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, Profile, EmailVerificationToken


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Admin configuration for User model.
    """

    list_display = [
        "email",
        "username",
        "first_name",
        "last_name",
        "role",
        "is_verified",
        "is_active",
        "date_joined",
    ]
    list_filter = ["role", "is_verified", "is_active", "date_joined"]
    search_fields = ["email", "username", "first_name", "last_name"]
    ordering = ["-date_joined"]

    fieldsets = BaseUserAdmin.fieldsets + (
        (_("Additional Info"), {"fields": ("role", "is_verified")}),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (
            _("Additional Info"),
            {"fields": ("email", "first_name", "last_name", "role")},
        ),
    )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for Profile model.
    """

    list_display = ["user", "bio_preview", "phone_number", "location", "created_at"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["user__email", "user__first_name", "user__last_name", "bio"]
    ordering = ["-created_at"]

    def bio_preview(self, obj):
        """Return a preview of the bio."""
        return obj.bio[:50] + "..." if len(obj.bio) > 50 else obj.bio

    bio_preview.short_description = "Bio Preview"


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    """
    Admin configuration for EmailVerificationToken model.
    """

    list_display = ["user", "token_preview", "is_used", "expires_at", "created_at"]
    list_filter = ["is_used", "expires_at", "created_at"]
    search_fields = ["user__email", "token"]
    ordering = ["-created_at"]
    readonly_fields = ["token"]

    def token_preview(self, obj):
        """Return a preview of the token."""
        return f"{obj.token[:10]}..."

    token_preview.short_description = "Token Preview"
