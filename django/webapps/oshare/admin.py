from django.contrib import admin
from .models import User, Post, PostImage, Comment, Order, Cart

# Register your models here.
# admin.site.register(FollowModel)
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Comment)
# admin.site.register(Product)
# admin.site.register(ProductCount)
admin.site.register(Order)
admin.site.register(Cart)