from django.db import models
# Create your models here.


class Post(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateTimeField()
    likes = models.IntegerField(default=0)
    text = models.CharField(max_length=1500)
    products = models.ManyToManyField('Product')


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images')
    image = models.ImageField(upload_to='oshare/post_img', null=True, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateTimeField()
    text = models.CharField(max_length=300)
