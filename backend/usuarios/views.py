import re
import json
import requests
from collections import namedtuple
from django.db import connection
from datetime import datetime
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from decouple import config
from itertools import count
from django.shortcuts import get_object_or_404
from rest_framework import filters
from datetime import datetime
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework_word_filter import FullWordSearchFilter
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.test import RequestFactory
from rest_framework.pagination import PageNumberPagination
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from drf_excel.renderers import XLSXRenderer
from drf_excel.mixins import XLSXFileMixin
from .models import *
from .serializer import *


# Create your views here.


@extend_schema(responses=UsuarioGrupoProgramaSerializer)
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def programa_grupo_permiso(request):
    try:
        usuario = request.user
        print("Autenticado:", usuario.is_authenticated)
        # print(f"Usuario autenticado: {usuario.username}")
        queryset = Usuario.objects.get(id=usuario.id)
        # print(f"Queryset: {queryset}")
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UsuarioGrupoProgramaSerializer(queryset)
        return Response(serializer.data)


def get_user_data(user):
    # Esta función llama a la función programa_grupo_permiso y devuelve los datos que se incluyen en el token
    request = RequestFactory().get('/rest/v1/programa_grupo_permiso/')
    request.user = user
    # print(f"La petición es: {request}")
    response = programa_grupo_permiso(request)
    # print(f"La respuesta es: {response}")

    if response.status_code == 200:
        data = response.data
        return data
    else:
        return None


class CustomTokenObtainPairView(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_data'] = get_user_data(self.user)

        # Datos del catalogo
        catalogos = Catalago.objects.all()
        catalogo_data = CatalogoSerializer(catalogos, many=True).data
        data['catalogo'] = catalogo_data

        # Datos del municipio
        municipios = Municipio.objects.select_related('departamento__pais').all()
        municipio_data = MunicipioAutocompleteSerializer(municipios, many=True).data
        data['municipio'] = municipio_data

        return data


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificar_sesion(request):
    if request.user.is_authenticated:
        return Response({"mensaje": "La sesión está activa"}, status=status.HTTP_200_OK)
    else:
        return Response({"mensaje": "La sesión ha expirado o no está activa"}, status=status.HTTP_401_UNAUTHORIZED)


class PersonaDetailView(APIView):
    def get(self, request, pk=None):
        if pk:
            persona = Persona.objects.get(pk=pk)
            serializer = PersonacSerializer(persona)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Paginación
        personas = Persona.objects.all()
        paginator = PageNumberPagination()
        paginated_personas = paginator.paginate_queryset(personas, request)
        serializer = PersonacSerializer(paginated_personas, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = PersonacSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        persona = Persona.objects.get(pk=pk)
        serializer = PersonacSerializer(persona, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        persona = Persona.objects.get(pk=pk)
        persona.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PersonaSelectListView(APIView):
    def get(self, request):
        # Obtener el parámetro 'rol' de la consulta, si existe
        rol = request.query_params.get('rol', None)

        if rol:
            # Filtrar las personas por rol si se proporciona
            personas = Persona.objects.filter(rol=rol)
        else:
            # Si no se proporciona el rol, obtener todas las personas
            personas = Persona.objects.all()

        # Serializar los datos de las personas filtradas
        serializer = PersonaselecSerializer(personas, many=True)

        # Retornar los datos serializados
        return Response(serializer.data)


class PersonabuscarView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                persona = Persona.objects.get(documento=pk)
                serializer = PersonacSerializer(persona)
                # Retornar un único objeto en la estructura deseada
                return Response({

                    "count": 1,
                    "next": None,
                    "previous": None,
                    "results": [serializer.data]

                }, status=status.HTTP_200_OK)
            except Persona.DoesNotExist:
                return Response(
                    {"detail": "Persona no encontrada."},
                    status=status.HTTP_404_NOT_FOUND
                )

        # Paginación
        personas = Persona.objects.all()
        paginator = PageNumberPagination()
        paginated_personas = paginator.paginate_queryset(personas, request)

        # Serializar los datos paginados
        serializer = PersonacSerializer(paginated_personas, many=True)

        # Retornar la respuesta directamente como `data`
        return Response({

            "count": paginator.page.paginator.count,
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),
            "results": serializer.data

        }, status=status.HTTP_200_OK)
