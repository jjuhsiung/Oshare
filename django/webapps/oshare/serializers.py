from django.conf.urls import url, include
from oshare.models import *
from rest_framework import routers, serializers, viewsets


# Serializers define the API representation.
class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'first_name', 'last_name', 'username']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        user = UserModelSerializer()
        fields = ['id', 'user', 'date', 'likes', 'text']


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        user = UserModelSerializer()
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
        user = UserModelSerializer()
        fields = ['id', 'user', 'total', 'ship_addr', 'order_time']


class CartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cart
        user = UserModelSerializer()
        fields = ['id', 'user', 'total']