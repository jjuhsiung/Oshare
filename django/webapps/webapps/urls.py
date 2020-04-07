from django.contrib import admin
from django.db import router
from django.urls import path
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
]