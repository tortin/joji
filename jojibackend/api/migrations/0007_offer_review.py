# Generated by Django 4.2.1 on 2023-07-06 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_profile_likes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
