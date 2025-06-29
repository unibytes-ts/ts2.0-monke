"""
User signals for the marketplace project.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Profile
import logging

User = get_user_model()
logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Create a Profile instance when a User is created.
    """
    if created:
        Profile.objects.create(user=instance)
        logger.info(f"Profile created for user: {instance.email}")
