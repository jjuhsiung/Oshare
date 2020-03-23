from django.db import models
# Create your models here.

class UserModel(models.Model):
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    username = models.CharField(max_length=30, default='')
    email = models.CharField(max_length=60)
    phone = models.IntegerField(max_length=15)
    address = models.CharField(max_length=60)
    password = models.CharField(max_length = 100)
    profile_picture = models.ImageField(
        upload_to="images/", default="images/profile.png")

    def __str__(self):
        return 'id=' + str(self.id) + ', name=' + self.first_name+" " + self.last_name + ", username=" + self.username
    
class FollowModel(models.Model):
    follower = models.ForeignKey(
        UserModel, related_name="who_follows", on_delete=models.CASCADE)
    followed = models.ForeignKey(
        UserModel, related_name="who_is_followed", on_delete=models.CASCADE)
    follow_time = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{} follows {}'.format(self.follower, self.followed) + ' at ' + str(self.follow_time)

class Post(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    date = models.DateTimeField()
    likes = models.IntegerField(default=0)
    text = models.CharField(max_length=1500)
    products = models.ManyToManyField('Product')

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images')
    image = models.ImageField(upload_to='oshare/post_img', null=True, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    date = models.DateTimeField()
    text = models.CharField(max_length=300)

class Product(models.Model):
    name = models.CharField(max_length=300)
    brand = models.CharField(max_length=300)
    price = models.FloatField(default=0)
    description = models.CharField(max_length=400)
    image = models.ImageField(upload_to='oshare/product_img', null=True, blank=True)
    rating = models.FloatField(default=0)

class ProductCount(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

class Order(models.Model):
	user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
	total = models.IntegerField(default=0)
	ship_addr = models.CharField(max_length=100)
	order_time = models.DateTimeField()

class Cart(models.Model):
	user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
	total = models.IntegerField(default=0)

