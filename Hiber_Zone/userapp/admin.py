from django.contrib import admin
from .models import Video

class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'video_url', 'uploaded_at']  # Customize as needed
    search_fields = ['title', 'description']  # Add fields to search
    fields = ['title', 'description', 'video_url']  # Fields to display in the admin form

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj:  # Check if editing an existing object
            if 'video_url' in form.base_fields:
                form.base_fields['video_url'].widget.attrs['readonly'] = True
        return form

    def save_model(self, request, obj, form, change):
        if 'video_url' in form.cleaned_data:
            # Check if the URL is from Instagram or YouTube
            video_url = form.cleaned_data['video_url']
            if 'instagram.com' in video_url:
                # Handle Instagram URL
                # Your logic to save Instagram URL
                pass
            elif 'youtube.com' in video_url or 'youtu.be' in video_url:
                # Handle YouTube URL
                # Your logic to save YouTube URL
                pass
        super().save_model(request, obj, form, change)

admin.site.register(Video, VideoAdmin)



