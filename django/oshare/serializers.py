from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from .models import Post, Comment, PostImage, Order, Cart, Product, Review, \
    ProductCount, UserProfile, OrderProductCount


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'category', 'product_type',
                  'price', 'price_sign', 'currency', 'img_link', 'description','rating']

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductSerializer
    class Meta:
        model = Review
        fields = ['headline', 'review', 'rating', 'user', 'product']


class OrderProductCountSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderProductCount
        fields = ['id', 'order', 'product', 'count']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    productCounts = OrderProductCountSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'first_name', 'last_name',
                  'phone', 'address', 'order_time', 'productCounts']


class ProductCountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductCount
        fields = ['id', 'cart', 'product', 'count']


class CartSerializer(serializers.HyperlinkedModelSerializer):
    productCounts = ProductCountSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'url', 'productCounts']


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address', 'profile_picture']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    cart = CartSerializer(read_only=True)
    order = OrderSerializer(many=True, read_only=True)
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username',
                  'email', 'password', 'cart', 'order', 'profile']

    def create(self, validated_data):
        # user = User.objects.create_user(**validated_data)
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        cart = Cart(user=user)
        cart.save()
        profile = UserProfile(user=user)
        profile.save()
        return user


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'date', 'text']


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address', 'profile_picture']


class PostImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'post', 'image']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'url', 'user', 'date', 'likes',
                  'title', 'text', 'images', 'comments', 'products']
