from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Comment, PostImage, Order, Cart


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ['user', 'date', 'likes', 'text']


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        user = UserSerializer()
        post = PostSerializer()
        fields = ['id', 'user', 'post', 'date', 'text']


class PostImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostImage
        post = PostSerializer()
        fields = ['id', 'user', 'date', 'likes', 'text']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        user = UserSerializer()
        fields = ['id', 'user', 'total', 'ship_addr', 'order_time']


class CartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cart
        user = UserSerializer()
        fields = ['id', 'user', 'total']