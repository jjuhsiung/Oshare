from django.contrib import admin
from django.db import router
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from oshare import views
from rest_framework.authtoken.views import ObtainAuthToken
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'register', views.UserViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'postImages', views.PostImageViewSet)
router.register(r'profile', views.ProfileViewSet)
router.register(r'cart', views.CartViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'productCounts', views.ProductCountViewSet)
router.register(r'orders', views.OrderViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    #path(r'api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', views.CustomObtainAuthToken.as_view()),
    path('update_product', views.update_products_view),
    # path('get_product', views.get_product_view),
    #path('add_to_cart', views.add_to_cart_view),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
