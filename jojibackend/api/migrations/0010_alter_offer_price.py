# Generated by Django 4.2.2 on 2023-07-12 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_offer_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='price',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
