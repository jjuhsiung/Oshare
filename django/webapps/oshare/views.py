<<<<<<< HEAD
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from oshare.serializers import UserSerializer, PostSerializer
from .models import Post



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
=======
from django.shortcuts import render
from rest_framework import viewsets
from oshare.models import *

from oshare.serializers import *


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
>>>>>>> yinuod


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
<<<<<<< HEAD
    serializer_class = PostSerializer
=======
    serializer_class = PostSerializer
>>>>>>> yinuod
