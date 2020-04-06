from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from oshare.serializers import UserSerializer, PostSerializer
from .models import Post


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer