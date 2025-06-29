"""
User models for the marketplace project.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from core.mixins import TimeStampedModel


class User(AbstractUser):
    """
    Custom user model with role-based access control.
    """

    class UserRole(models.TextChoices):
        STUDENT = "STUDENT", _("Student")
        STARTUP = "STARTUP", _("Startup")
        MENTOR = "MENTOR", _("Mentor")
        ADMIN = "ADMIN", _("Admin")

    email = models.EmailField(_("email address"), unique=True)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.STUDENT,
        help_text=_("User role in the marketplace"),
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_("Designates whether this user has verified their email address."),
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    @property
    def full_name(self):
        """Return the user's full name."""
        return f"{self.first_name} {self.last_name}".strip()


class Profile(TimeStampedModel):
    """
    User profile model for additional user information.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(
        max_length=500, blank=True, help_text=_("A brief description about the user")
    )
    avatar = models.ImageField(
        upload_to="avatars/", blank=True, null=True, help_text=_("User profile picture")
    )
    phone_number = models.CharField(
        max_length=20, blank=True, help_text=_("User phone number")
    )
    location = models.CharField(
        max_length=100, blank=True, help_text=_("User location/city")
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return f"Profile of {self.user.email}"


class EmailVerificationToken(TimeStampedModel):
    """
    Model to store email verification tokens.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="verification_tokens"
    )
    token = models.CharField(
        max_length=64, unique=True, help_text=_("Email verification token")
    )
    is_used = models.BooleanField(
        default=False, help_text=_("Whether this token has been used")
    )
    expires_at = models.DateTimeField(help_text=_("Token expiration date"))

    class Meta:
        verbose_name = _("Email Verification Token")
        verbose_name_plural = _("Email Verification Tokens")
        ordering = ["-created_at"]

    def __str__(self):
        return f"Verification token for {self.user.email}"
