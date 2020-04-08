from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Comment, PostImage, Order, Cart, Product


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'date', 'text']
        

class PostImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'post', 'image']
        
        
class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'url', 'user', 'date', 'likes', 'title', 'text', 'images', 'comments']

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        user = UserSerializer(read_only=True)
        fields = ['id', 'user', 'total', 'ship_addr', 'order_time']


class CartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cart
        user = UserSerializer(read_only=True)
        fields = ['id', 'user', 'total']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'category', 'product_type',
                  'price', 'price_sign', 'currency', 'img_link', 'description']