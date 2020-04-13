from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Comment, PostImage, Order, Cart, Product, Review, \
    ProductCount, UserProfile, OrderProductCount


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'category', 'product_type',
                  'price', 'price_sign', 'currency', 'img_link', 'description']

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
        fields = ['id', 'user', 'first_name', 'last_name', 'phone', 'address', 'order_time', 'productCounts']


class ProductCountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductCount
        fields = ['id', 'cart', 'product', 'count']

class CartSerializer(serializers.HyperlinkedModelSerializer):
    productCounts = ProductCountSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'url', 'productCounts']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    cart = CartSerializer(read_only=True)
    order = OrderSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'cart', 'order']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        cart = Cart(user=user)
        cart.save()
        return user
    
    def put(self, instance, validated_data):
        print("invoked put")
        instance.first_name = validated_data.get('first_name', instance.first_name)
        print('instance of username',instance.first_name)
        return instance 


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'date', 'text']


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address', 'profile_picture', 'following']


class PostImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'post', 'image']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = PostImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'url', 'user', 'date', 'likes',
                  'title', 'text', 'images', 'comments']


