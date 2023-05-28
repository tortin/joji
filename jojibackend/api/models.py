from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Profile(models.Model):

    age = models.IntegerField(null = True)
    name = models.CharField(max_length=100, null = True)
    gender = models.CharField(max_length=10, choices=(("M", "Male"), ("F", "Female"), ), default = "M")
    price = models.CharField(max_length=50, null=True)
    experience = models.CharField(max_length=50, null = True)
    locations = ArrayField(models.CharField(max_length=50), null = True)
    subjects = ArrayField(models.CharField(max_length=50), null = True)
    type = models.CharField(max_length=10, choices=(("student", "Student"), ("tutor", "Tutor"), ), default = "student")