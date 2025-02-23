from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=False)
    

    def __str__(self):
        return self.title

class Realisation(models.Model):
    title = models.CharField(max_length=100)
    image = CloudinaryField('image')
    posts = models.ManyToManyField(Post)

    def __str__(self):
        return self.title
    
