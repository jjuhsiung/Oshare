from django.contrib import admin
<<<<<<< HEAD
from .models import Post, Comment, PostImage, Order, Cart

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostImage)
=======
from .models import UserModel, FollowModel, Post, PostImage, Comment, Product, ProductCount, Order, Cart

# Register your models here.
admin.site.register(UserModel)
admin.site.register(FollowModel)
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Comment)
admin.site.register(Product)
admin.site.register(ProductCount)
>>>>>>> yinuod
admin.site.register(Order)
admin.site.register(Cart)