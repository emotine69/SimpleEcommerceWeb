from django.shortcuts import render
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Products
from .serializers import ProductsSerializer
# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls={
        'Products':'/products/',
    }
    return Response(api_urls)

@api_view(['GET'])

def ProductsList(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products,many=True)
    return Response(serializer.data)