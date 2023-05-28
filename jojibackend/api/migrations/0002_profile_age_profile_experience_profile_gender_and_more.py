# Generated by Django 4.2.1 on 2023-05-28 06:43

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='age',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='experience',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=10),
        ),
        migrations.AddField(
            model_name='profile',
            name='locations',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), null=True, size=None),
        ),
        migrations.AddField(
            model_name='profile',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='price',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='subjects',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), null=True, size=None),
        ),
        migrations.AddField(
            model_name='profile',
            name='type',
            field=models.CharField(choices=[('student', 'Student'), ('tutor', 'Tutor')], default='student', max_length=10),
        ),
    ]
