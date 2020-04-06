from django.contrib import admin
from django.db import router
from django.urls import path
<<<<<<< HEAD
from django.urls import include, path
from rest_framework import routers
from oshare import views
from rest_framework.authtoken.views import ObtainAuthToken

router = routers.DefaultRouter()
router.register(r'register', views.UserViewSet)
router.register(r'posts', views.PostViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path(r'api-auth', include('rest_framework.urls', namespace='rest_framework'))
    # path('auth/', ObtainAuthToken.as_view())
=======
from django.conf.urls import url, include
from oshare.models import *
from rest_framework import routers, serializers, viewsets

from oshare.views import *


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
>>>>>>> yinuod
]