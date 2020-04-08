from django.contrib import admin

from .models import Product, UserModel, Cart, CartProduct
# Register your models here.

admin.site.register(Product)
admin.site.register(UserModel)
admin.site.register(Cart)
admin.site.register(CartProduct)