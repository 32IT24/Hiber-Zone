from django.db import models
from django.contrib.auth.models import User

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    video_file = models.FileField(upload_to='videos/', null=True, blank=True)
    video_url = models.URLField(max_length=200, verbose_name="Video URL", blank=True, default='')  # Added default and blank=True
    uploaded_at = models.DateTimeField(auto_now_add=True)
