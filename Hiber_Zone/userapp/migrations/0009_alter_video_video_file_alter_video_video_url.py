# Generated by Django 4.2.9 on 2024-03-07 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0008_video_video_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='video_file',
            field=models.FileField(blank=True, null=True, upload_to='videos/'),
        ),
        migrations.AlterField(
            model_name='video',
            name='video_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
