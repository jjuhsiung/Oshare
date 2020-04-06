from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from oshare import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'posts', views.PostViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]