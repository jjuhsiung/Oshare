from django.shortcuts import render
from rest_framework import viewsets
from oshare.models import *

from oshare.serializers import *


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
