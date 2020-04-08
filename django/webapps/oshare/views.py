from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from oshare.serializers import UserSerializer, PostSerializer, CommentSerializer, PostImageSerializer
from .models import Post, Comment, PostImage
from rest_framework.response import Response
from rest_framework.decorators import action


class CustomObtainAuthToken(ObtainAuthToken):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # url: http://127.0.0.1:8000/posts/post_of_logged_in_user/
    @action(detail=False, methods=['get'])
    def post_of_logged_in_user(self, request):
        print(request.data)
        user = request.user
        queryset = Post.objects.filter(user=user.id)
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    # url: http://127.0.0.1:8000/posts/post_of_selected_user/?selected_id=1
    @action(detail=False, methods=['get'])
    def post_of_selected_user(self, request, *args, **kwargs):
        print(request.GET['selected_id'])
        selected_user = int(request.GET['selected_id'])
        queryset = Post.objects.filter(user=selected_user)
        serializer = PostSerializer(queryset, many=True, context={'request': request})
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
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    # TODO: query with different rules

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class PostImageViewSet(viewsets.ModelViewSet):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
