from django.contrib import admin
from .models import Post, Comment, PostImage, Order, Cart

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostImage)
admin.site.register(Order)
admin.site.register(Cart)