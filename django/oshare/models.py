from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=60)
    profile_picture = models.ImageField(
        upload_to="images/")

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=200, null=True, default='python')
    text = models.CharField(max_length=1500)
    products = models.ManyToManyField('Product', related_name="products")


class PostImage(models.Model):
    post = models.ForeignKey(
        Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='oshare/post_img', null=True, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    text = models.CharField(max_length=300)


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='order')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=100)
    order_time = models.DateTimeField(default=timezone.now)
    total = models.IntegerField(default=0)

class Cart(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='cart')


class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=300)
    brand = models.CharField(max_length=300, null=True)
    category = models.CharField(max_length=300, null=True)
    product_type = models.CharField(max_length=300, null=True)
    price = models.FloatField(default=0.0)
    price_sign = models.CharField(default="$", max_length=8, null=True)
    currency = models.CharField(default="USD", max_length=10, null=True)
    img_link = models.URLField(max_length=300, null=True)
    description = models.CharField(default='', max_length=500, null=True)
    rating = models.FloatField(default=0.0)
    tag_list = models.CharField(max_length=500,null=True)
    click = models.IntegerField()

class Review(models.Model):
    headline = models.CharField(max_length=100)
    review = models.CharField(max_length=300)
    rating = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

# Product Count for cart
class ProductCount(models.Model):
    count = models.IntegerField(default=0)
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='productCounts')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

# Product Count for order
class OrderProductCount(models.Model):
    count = models.IntegerField(default=0)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='productCounts')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
