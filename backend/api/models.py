from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='images/posts', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Realisation(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/realisations', null=True, blank=True)
    posts = models.ManyToManyField(Post)

    def __str__(self):
        return self.title
    
