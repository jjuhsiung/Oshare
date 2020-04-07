from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserProfile(models.Model):
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=60)
    profile_picture = models.ImageField(
        upload_to="images/", default="images/profile.png")
    following = models.ManyToManyField(User, related_name='following')


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default = timezone.now)
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=200, null=True, default='python')
    text = models.CharField(max_length=1500)
    #products = models.ManyToManyField('Product')
    
class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='oshare/post_img', null=True, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default = timezone.now)
    text = models.CharField(max_length=300)

# class Product(models.Model):
#     name = models.CharField(max_length=300)
#     brand = models.CharField(max_length=300)
#     price = models.FloatField(default=0)
#     description = models.CharField(max_length=400)
#     image = models.ImageField(upload_to='oshare/product_img', null=True, blank=True)
#     rating = models.FloatField(default=0)

# class ProductCount(models.Model):
#     product = models.OneToOneField(Product, on_delete=models.CASCADE)
#     count = models.IntegerField(default=0)


class Order(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	total = models.IntegerField(default=0)
	ship_addr = models.CharField(max_length=100)
	order_time = models.DateTimeField()

class Cart(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	total = models.IntegerField(default=0)
