from django.shortcuts import render
from rest_framework import viewsets
from oshare.models import *

from oshare.serializers import PostSerializer


# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
