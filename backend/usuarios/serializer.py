import base64
from datetime import date
import os
import uuid
from django.db.models import Count, Max, Subquery, OuterRef, Q
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from .models import *


class CatalogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalago
        fields = ['opcion', 'tipo']


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ['id', 'nombre']


class DepartamentoSerializer(serializers.ModelSerializer):
    pais = PaisSerializer()

    class Meta:
        model = Departamento
        fields = ['id', 'nombre', 'pais']


class MunicipioSerializer(serializers.ModelSerializer):
    departamento = DepartamentoSerializer()

    class Meta:
        model = Municipio
        fields = ['id', 'nombre', 'departamento']


class MunicipioAutocompleteSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Municipio
        fields = ('id', 'full_name')

    def get_full_name(self, obj):
        return f"{obj.nombre} - {obj.departamento.nombre} - {obj.departamento.pais.nombre}"


class PersonaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    municipio_nacimiento = MunicipioSerializer()
    municipio_expedicion = MunicipioSerializer()

    class Meta:
        model = Persona
        fields = ['id', 'tipo_documento', 'documento', 'fecha_expedicion_doc', 'primer_nombre', 'segundo_nombre',
                  'primer_apellido', 'segundo_apellido', 'fecha_nacimiento', 'municipio_nacimiento',
                  'municipio_expedicion']


class PermissionSerializer(serializers.ModelSerializer):
    """ Serializador para el modelo Permission nativo django"""

    class Meta:
        model = Permission
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']


class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = ['nombre']


class SubModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubModulo
        fields = ['nombre']


class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['id', 'descripcion']


class ModuloGrupoPermisoSerializer(serializers.ModelSerializer):
    modulo = ModuloSerializer(many=True)
    submodulo = SubModuloSerializer(many=True)
    grupodj = GroupSerializer(many=True)
    sedegp = SedeSerializer(many=True)

    class Meta:
        model = ModuloGrupoPermiso
        fields = ['id', 'modulo', 'submodulo', 'grupodj', 'sedegp']


class UsuarioGrupoProgramaSerializer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    modulo_gpo_permiso = ModuloGrupoPermisoSerializer()

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'persona', 'modulo_gpo_permiso']


class PersonacSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Persona
        fields = ['id', 'tipo_documento', 'documento', 'fecha_expedicion_doc', 'primer_nombre', 'segundo_nombre',
                  'primer_apellido', 'segundo_apellido', 'fecha_nacimiento', 'municipio_nacimiento', 'sexo', 'correo',
                  'telefono','etnia', 'victima','rol','discapacidad','acudiente'
                  ]


class PersonaselecSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id', 'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'documento','rol']
