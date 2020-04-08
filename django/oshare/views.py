from django.http import HttpResponse, HttpRequest, JsonResponse
from django.template import loader
from oshare.models import Product, CartProduct, Cart
import json


def add_product_view(request: HttpRequest) -> JsonResponse:
    data = {}
    try:
        name = request.POST["name"]
        brand = request.POST["name"]
        price = float(request.POST["price"])
        description = request.POST['description']
        product = Product(name=name, brand=brand, price=price, description=description)
        product.save()
        data["status"] = 'okay'
    except Exception:
        data['error'] = 'Failure'
    return JsonResponse(data)


def add_to_cart_view(request: HttpRequest) -> JsonResponse:
    data = {}
    try:
        product_id = request.POST['id']
        product = Product.objects.get(id=product_id)
        cart = Cart.objects.get(user=request.user)
    except Exception:
        data["error"] = 'Fail to add to cart'
        return JsonResponse(data)

    try:
        cart_product = CartProduct.objects.get(product=product)
        cart_product.count += 1
        cart_product.save()
    except CartProduct.DoesNotExist:
        cart_product = CartProduct(product=product, count=1)
        cart_product.save()
        cart.products.add(cart_product)

    cart.total += 1
    cart.save()
    data["cart_count"] = cart.total
    data["status"] = 'add to cart succeeded!'

    return JsonResponse(data)
