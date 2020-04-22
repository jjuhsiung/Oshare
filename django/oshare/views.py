from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from .models import Post, Comment, PostImage, UserProfile
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse, HttpRequest, JsonResponse
from .models import Product, ProductCount, Cart
import json

import urllib
import json
from requests.utils import requote_uri
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from rest_framework.generics import get_object_or_404

class CustomObtainAuthToken(ObtainAuthToken):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(
            request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class UserViewSet(viewsets.ModelViewSet):
    print("user view set")
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def get_by_username(self, request, pk=None):
        queryset = User.objects.filter(username=request.GET['username'])
        try:
            user = get_object_or_404(queryset)
            return Response(UserSerializer(user, context={'request': request}).data, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"detail":"Not Found"})

    @action(detail=False, methods=['get'])
    def get_current_user(self, request):
        try:
            return Response(
                UserSerializer(request.user, context={'request': request}).data, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"detail":"Not Found"})

    @action(detail=False, methods=['get'])
    def get_current_userid(self, request):
        try:
            return JsonResponse({"id": request.user.id})
        except:
            return JsonResponse({"detail":"Not Found"})
            


# url: http://127.0.0.1:8000/update_user/id/
class UserUpdateViewSet(viewsets.ModelViewSet):
    '''
    Partial update without password.
    '''
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # url: http://127.0.0.1:8000/posts/post_of_logged_in_user/

    @action(detail=False, methods=['get'])
    def post_of_logged_in_user(self, request):
        user = request.user
        queryset = Post.objects.filter(user=user.id)
        serializer = PostSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    # url: http://127.0.0.1:8000/posts/post_of_selected_user/?selected_id=1
    @action(detail=False, methods=['get'])
    def post_of_selected_user(self, request, *args, **kwargs):
        print(request.GET['selected_id'])
        selected_user = int(request.GET['selected_id'])
        queryset = Post.objects.filter(user=selected_user)
        serializer = PostSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    # url: http://127.0.0.1:8000/posts/1/update_post_likes/?latest_like=10
    @action(detail=True, methods=['post'])
    def update_post_likes(self, request, *args, **kwargs):
        print("invoked")
        latest_like = int(request.GET['latest_like'])
        print(latest_like)
        post = self.get_object()
        print(post)
        queryset = Post.objects.filter(id=post.id)
        queryset.update(likes=latest_like)
        serializer = PostSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    # TODO: add related product to post
    @action(detail=True, methods=['post'])
    def add_post_products(self, request, *args, **kwargs):
        print("add related product invoked")
        # print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(request.body)

        post = self.get_object()
        queryset = Post.objects.filter(id=post.id)
        print(body)
        # update product
        print(type(body['products']))
        for item in body['products']:
            product = Product.objects.get(id=item['id'])
            print(product)
            post.products.add(product)
            post.save()

        serializer = PostSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class PostImageViewSet(viewsets.ModelViewSet):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        userId = int(request.data.get("userId"))
        cartId = int(request.data.get("cartId"))

        cart = Cart.objects.filter(id=cartId)[0]
        user = User.objects.filter(id=userId)[0]

        order = Order(user=user,
                      first_name=request.data.get("first_name"),
                      last_name=request.data.get("last_name"),
                      phone=request.data.get("phone"),
                      address=request.data.get("address"))
        order.save()

        productCountsSet = cart.productCounts.all()
        for i in range(len(productCountsSet)):
            productCount = productCountsSet[i]
            orderProductCount = OrderProductCount(order=order,
                                                  product=productCount.product,
                                                  count=productCount.count)
            productCount.delete()
            orderProductCount.save()

        queryset = Order.objects.filter(pk=order.pk)
        serializer = OrderSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


def update_products_view(request: HttpRequest) -> JsonResponse:
    # url = "http://makeup-api.herokuapp.com/api/v1/products.json"
    # url = requote_uri(url)
    # connection = urllib.request.urlopen(url)
    with open('./oshare/makeup-new.json', encoding="utf8") as f:
        response = json.load(f)
    # response = json.load(connection)
    # print(response)
    for x in response:
        try:
            Product.objects.get(id=x['id'])
        except Product.DoesNotExist:
            # conn = http.client.HTTPConnection(x['image_link'])
            # conn.request('HEAD', path)
            # response = conn.getresponse()
            # conn.close()
            # if response.status != 200:
            #     continue
            price = 10.0
            # print(x)
            if x['price'] != None and float(x['price'])>0:
                price = float(x['price'])
            rating = 0.0
            if x['rating']!=None:
                rating= float(x['rating'])
            tag_list = ""
            if x['tag_list']!=None:
                tag_list=json.dumps(x['tag_list'])
            new_product = Product(
                id=int(x['id']),
                name=x['name'],
                brand=x['brand'],
                category=x['category'],
                product_type=x['product_type'],
                price=price,
                price_sign=x['price_sign'],
                currency=x['currency'],
                img_link=x['image_link'],
                description=x['description'],
                rating=rating,
                tag_list=tag_list,
            )
            new_product.save()
            if x['product_colors']!=None:
                print(x['id'])
                for colors in x['product_colors']:
                    # print("colors",colors)
                    new_product_color = ProductColor(
                        hex_value=colors['hex_value'],
                        color_name=colors['colour_name'],
                        product=new_product,
                    )
                    new_product_color.save()
    return JsonResponse({})


class ProductCountViewSet(viewsets.ModelViewSet):
    queryset = ProductCount.objects.all()
    serializer_class = ProductCountSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.count = request.data.get("count")
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def addToCart(self, request, *args, **kwargs):
        cartId = int(request.data.get("cartId"))
        productId = int(request.data.get("productId"))
        product = Product.objects.get(id=productId)
        product.bought_num += 1
        product.save()
        cart = Cart.objects.get(id=cartId)

        try:
            cart_product = ProductCount.objects.get(product=product, cart=cart)
            cart_product.count += 1
            cart_product.save()
        except ProductCount.DoesNotExist:
            cart_product = ProductCount(product=product, count=1, cart=cart)
            cart_product.save()

        queryset = ProductCount.objects.none()
        queryset |= ProductCount.objects.filter(pk=cart_product.pk)
        serializer = ProductCountSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def click_product(self, request):
        product_id = int(request.GET['product_id'])
        product = Product.objects.get(id=product_id)
        product.click_num += 1
        product.save()
        return Response()

    @action(detail=False, methods=['get'])
    def get_popular(self, request):
        if 'user_id' in request.GET:
            print(int(request.GET['user_id']))
            user = User.objects.get(id=int(request.GET['user_id']))
            reviews = Review.objects.filter(user=user)[:4]
            queryset = []
            for x in reviews:
                if x.product not in queryset:
                    queryset.append(x.product)
            more_product = Product.objects.all().order_by('-click_num')[:4]
            for x in more_product:
                if x not in queryset:
                    queryset.append(x)
            queryset = queryset[:4]
        else:
            print('Anonymous User')
            queryset = Product.objects.all().order_by('-click_num')[:4]
        serializer = ProductSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_product_color(self, request):
        print("get_product_color")
        if 'product_id' in request.GET:
            print(int(request.GET['product_id']))
            # product = Product.objects.get(id=product_id)
            queryset = ProductColor.objects.all()
            print(len(queryset))
            # queryset = self.queryset.filter(product=product)
            product = Product.objects.get(id=int(request.GET['product_id']))
            productColor = product.productcolor_set.all()

            # productColor = queryset.filter(product=product)
            print(len(productColor))
            serializer=ProductColorSerializer(productColor, many=True, context={'request': request})
            return Response(serializer.data)
        return Response(None)


    @action(detail=False, methods=['get'])
    def search_product(self, request):
        print("request", request.data)
        queryset = Product.objects.all()
        print("entered the search product function, queryset", len(queryset))
        keys = request.GET.keys()
        if 'id' in keys:
            serializer = ProductSerializer(Product.objects.get(id=request.GET['id']), many=False,
                                           context={'request': request})
            return JsonResponse({'response': serializer.data})
        if 'name' in keys:
            queryset = queryset.filter(name=request.GET['name'])
            print("queryset after name", len(queryset))
        if 'brand' in keys:
            brand_list=request.GET['brand'].split(",")
            brandset = Product.objects.none()
            for brand in brand_list:
                print("brand",brand)
                tempset = queryset.filter(brand=brand)
                brandset = brandset | tempset
            queryset = brandset
            print("queryset after brand", len(queryset), request.GET['brand'])
        if 'category' in keys:
            queryset = queryset.filter(category=request.GET['category'])
            print("queryset after category", len(queryset))
        if 'type' in keys:
            queryset = queryset.filter(product_type=request.GET['type'])
            print("queryset after type", len(queryset))
        if 'price_greater_than'in keys:
            queryset = queryset.filter(
                price__gte=request.GET['price_greater_than'])
        if 'price_less_than'in keys:
            queryset = queryset.filter(
                price__lte=request.GET['price_less_than'])
        if 'input' in keys:
            print("input", request.GET['input'])
            str = request.GET['input'].split(" ")
            match_dict = dict.fromkeys(queryset, 0)
            tempset = Product.objects.none()
            for word in str:
                print("word in input", word)
                result = queryset.filter(name__contains=word)
                tempset = result.union(tempset)
                for product in result:  # TODO:any better ways?
                    match_dict[product]+=1
            queryMap={k: v for k, v in sorted(match_dict.items(), key=lambda item: item[1], reverse=True) if v!=0}
            print(queryMap)
            queryset = queryMap.keys()
        print("queryset in the search product", len(queryset))
        serializer = ProductSerializer(
            queryset, many=True, context={'request': request})
        # return Response(serializer.data)
        return JsonResponse({'response': serializer.data})


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @action(detail=False, methods=['post'])
    def add_review(self, request):
        # print("add reivew")
        headline = request.data.get('headline')
        review = request.data.get('review')
        product_id = int(request.data.get('product_id'))
        rating = int(request.data.get('rating'))
        user = User.objects.get(id=int(request.data.get('user_id')))
        product = Product.objects.get(id=product_id)
        new_review = Review(headline=headline, review=review, product=product, user=user, rating=rating)
        new_review.save()
        reviews = Review.objects.filter(product=product)
        total_rating = 0
        total = 0
        print(reviews)
        for x in reviews:
            if x.rating > 0.1:
                total += 1
                total_rating += x.rating
        if total > 0:
            # product = Product.objects.get(id=product_id)
            product.rating = total_rating/total
            product.save()
            print(product)
        return Response({})

    @action(detail=False, methods=['get'])
    def get_product_reviews(self, request):
        product_id = int(request.GET['product_id'])
        product = Product.objects.get(id=product_id)
        queryset = self.queryset.filter(product=product).order_by('-date')
        serializers = ReviewSerializer(
            queryset, many=True, context={'request': request}
        )
        return Response(serializers.data)

@csrf_exempt
def send_template_email_view(request: HttpRequest) -> JsonResponse:
    body_unicode = request.body.decode('utf-8')
    body = json.loads(request.body)
    print(body)

    # Send plain text EMAIL
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "osharecosmetics@gmail.com"
    receiver_email = body['email']
    password = "nmfpnidcluwfbptm"
    #password = input("Type your password and press enter:")
    message_plain = """\
    Subject: Hi there
    This message is sent from Python."""
    message = MIMEMultipart("alternative")
    message["Subject"] = "Welcome to O Sha'Re Cosmetics"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = """\
    Hi, beautiful!
    Want a new look?"""
    html = """\
    <html>
      <body>
        <p>Hi,<br>
           How are you?<br>
           <a href="https://osharecosmetics.herokuapp.com/">O'share</a>
           has many great products.
        </p>
      </body>
    </html>
    """

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)
    # Create a secure SSL context
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print("email sent");

    return JsonResponse({"result": "Email sent successfully!"});
