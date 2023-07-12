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
    remarks = models.TextField(null = True)
    matches = ArrayField(models.IntegerField(), default = list, blank = True)
    rejects = ArrayField(models.IntegerField(), default = list, blank = True)
    image = models.ImageField(upload_to='profile_pic', default='profile_pic/default.jpg')
    likes = ArrayField(models.IntegerField(), default = list, blank = True)

class Review(models.Model):

    sender = models.IntegerField(null = True)
    receiver = models.IntegerField(null = True)
    stars = models.IntegerField(null = True)
    comment = models.TextField(null = True)

class Offer(models.Model):

    sender = models.IntegerField(null = True)
    receiver = models.IntegerField(null = True)
    subject = models.CharField(null = True)
    price = models.CharField(max_length=50, null = True)
    status = models.CharField(max_length=10, choices=(("pending", "pending"), ("accepted", "accepted")), default="pending")