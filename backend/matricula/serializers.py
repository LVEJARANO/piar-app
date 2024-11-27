from rest_framework import serializers
from .models import Grados, Docente_Materia, Materias, Anual, Sede, Diagnostico, Piar, Contextogenaral, \
    Valoracionpedagogica,Objetivos,Razonables
from usuarios.serializer import PersonacSerializer
from usuarios.models import Persona

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['id', 'descripcion','direccion','telefono']


class AnualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anual
        fields = ['id', 'descripcion']


class MateriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materias
        fields = ['id', 'codigo', 'descripcion']


class DocenteMateriaSerializer(serializers.ModelSerializer):
    materias = serializers.PrimaryKeyRelatedField(queryset=Materias.objects.all(), many=True)

    class Meta:
        model = Docente_Materia
        fields = ['materias', 'profesor']


class DocentepdfMateriaSerializer(serializers.ModelSerializer):
    materias = serializers.PrimaryKeyRelatedField(queryset=Materias.objects.all(), many=True)
    profesor=PersonacSerializer()
    class Meta:
        model = Docente_Materia
        fields = ['materias', 'profesor']

class GradosSerializer(serializers.ModelSerializer):
    docente_materia = DocenteMateriaSerializer(many=True,source='docente_grado')

    class Meta:
        model = Grados
        fields = ['nombre_grado', 'anual', 'sede', 'estudiantes', 'profesor', 'docente_materia','docenteapoyo','docenteorienta']

    def create(self, validated_data):
        docente_materia_data = validated_data.pop('docente_materia', [])
        estudiantes_data = validated_data.pop('estudiantes', [])

        # Crear instancia de Grados
        grados = Grados.objects.create(**validated_data)

        # Asignar estudiantes al Grado usando .set()
        grados.estudiantes.set(estudiantes_data)

        # Crear registros de Docente_Materia asociados al Grado
        for docente_data in docente_materia_data:
            materias = docente_data.pop('materias')
            docente_materia_instance = Docente_Materia.objects.create(id_grado=grados, **docente_data)
            docente_materia_instance.materias.set(materias)

        return grados

    def update(self, instance, validated_data):
        docente_materia_data = validated_data.pop('docente_materia', [])
        estudiantes_data = validated_data.pop('estudiantes', [])

        # Actualizar campos individuales de Grados
        instance.nombre_grado = validated_data.get('nombre_grado', instance.nombre_grado)
        instance.anual = validated_data.get('anual', instance.anual)
        instance.sede = validated_data.get('sede', instance.sede)
        instance.profesor = validated_data.get('profesor', instance.profesor)
        instance.docenteapoyo = validated_data.get('docenteapoyo', instance.docenteapoyo)
        instance.docenteorienta = validated_data.get('docenteorienta', instance.docenteorienta)
        instance.save()

        # Actualizar estudiantes usando .set() después de guardar
        instance.estudiantes.set(estudiantes_data)

        # Eliminar los Docente_Materia que ya no están en los datos recibidos
        existing_professors = [docente['profesor'] for docente in docente_materia_data]
        current_docentes = Docente_Materia.objects.filter(id_grado=instance)
        for docente in current_docentes:
            if docente.profesor.id not in existing_professors:
                docente.delete()

        # Actualizar o crear los Docente_Materia
        for docente_data in docente_materia_data:
            profesor_id = docente_data.get('profesor')
            materias = docente_data.get('materias', [])

            # Buscar si ya existe una relación de Docente_Materia con el mismo profesor
            docente_materia_instance = Docente_Materia.objects.filter(
                id_grado=instance, profesor_id=profesor_id
            ).first()

            if docente_materia_instance:
                # Si ya existe, solo actualizamos las materias asociadas
                docente_materia_instance.materias.set(materias)
            else:
                # Si no existe, creamos una nueva relación Docente_Materia
                profesor = Persona.objects.get(pk=profesor_id)
                docente_materia_instance = Docente_Materia.objects.create(
                    id_grado=instance,
                    profesor=profesor
                )
                docente_materia_instance.materias.set(materias)

        return instance


class GradosSerializerpost(serializers.ModelSerializer):
    docente_materia = DocenteMateriaSerializer(many=True, write_only=True)

    class Meta:
        model = Grados
        fields = ['nombre_grado', 'anual', 'sede', 'estudiantes', 'profesor', 'docente_materia','docenteapoyo','docenteorienta']

    def create(self, validated_data):
        docente_materia_data = validated_data.pop('docente_materia', [])
        estudiantes_data = validated_data.pop('estudiantes', [])

        # Crear instancia de Grados
        grados = Grados.objects.create(**validated_data)

        # Asignar estudiantes al Grado usando .set()
        grados.estudiantes.set(estudiantes_data)

        # Crear registros de Docente_Materia asociados al Grado
        for docente_data in docente_materia_data:
            materias = docente_data.pop('materias')
            docente_materia_instance = Docente_Materia.objects.create(id_grado=grados, **docente_data)
            docente_materia_instance.materias.set(materias)

        return grados

    def update(self, instance, validated_data):
        docente_materia_data = validated_data.pop('docente_materia', [])
        estudiantes_data = validated_data.pop('estudiantes', [])

        # Actualizar campos individuales de Grados
        instance.nombre_grado = validated_data.get('nombre_grado', instance.nombre_grado)
        instance.anual = validated_data.get('anual', instance.anual)
        instance.sede = validated_data.get('sede', instance.sede)
        instance.profesor = validated_data.get('profesor', instance.profesor)
        instance.save()

        # Actualizar estudiantes usando .set() después de guardar
        instance.estudiantes.set(estudiantes_data)

        # Eliminar los Docente_Materia que ya no están en los datos recibidos
        existing_professors = [docente['profesor'] for docente in docente_materia_data]
        current_docentes = Docente_Materia.objects.filter(id_grado=instance)
        for docente in current_docentes:
            if docente.profesor.id not in existing_professors:
                docente.delete()

        # Actualizar o crear los Docente_Materia
        for docente_data in docente_materia_data:
            profesor_id = docente_data.get('profesor')
            materias = docente_data.get('materias', [])

            # Buscar si ya existe una relación de Docente_Materia con el mismo profesor
            docente_materia_instance = Docente_Materia.objects.filter(
                id_grado=instance, profesor_id=profesor_id
            ).first()

            if docente_materia_instance:
                # Si ya existe, solo actualizamos las materias asociadas
                docente_materia_instance.materias.set(materias)
            else:
                # Si no existe, creamos una nueva relación Docente_Materia
                profesor = Persona.objects.get(pk=profesor_id)
                docente_materia_instance = Docente_Materia.objects.create(
                    id_grado=instance,
                    profesor=profesor
                )
                docente_materia_instance.materias.set(materias)

        return instance



class GradoslistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grados
        fields = ['id', 'nombre_grado', 'anual', 'sede', 'estudiantes', 'profesor','docenteapoyo','docenteorienta']


class EstudianteGradoSerializer(serializers.ModelSerializer):
    estudiantes = PersonacSerializer(many=True, read_only=True)  # Serializador anidado
    profesor = PersonacSerializer()  # Relación ForeignKey para el profesor

    class Meta:
        model = Grados
        fields = ['id', 'nombre_grado', 'anual', 'sede', 'estudiantes', 'profesor']


class DiagnosticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnostico
        fields = ['id', 'descripcion', 'persona']


class PiarSerializer(serializers.ModelSerializer):
    soporte_url = serializers.SerializerMethodField()

    class Meta:
        model = Piar
        fields = ['id', 'nombre', 'anual', 'sede', 'grado', 'estudiante','soporte_url']

    def get_soporte_url(self, obj):
        request = self.context.get('request')
        if obj.soporte and request:
            return request.build_absolute_uri(obj.soporte.url)
        return None

class ContextogenaralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contextogenaral
        fields = ['id', 'descripacion', 'familiar', 'otros', 'piar']


class ValoracionpedagogicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valoracionpedagogica
        fields = ['competencias', 'principales', 'estado', 'piar']


class ValoracionpedagogicagetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valoracionpedagogica
        fields = ['id', 'competencias', 'principales', 'estado', 'piar']


class ObjetivosSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Objetivos
        fields = ['id','metas', 'evaluacion', 'piar', 'materia']


class ObjetivosgetSerializerget(serializers.ModelSerializer):
    materia = MateriasSerializer()  # Serializamos la materia relacionada

    class Meta:
        model = Objetivos
        fields = ['id', 'metas', 'evaluacion', 'materia']


class RazonablesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Razonables
        fields = ['id', 'ajustes', 'didacticos', 'evaluacion', 'adicionales', 'casa', 'piar', 'materia']



class GradosgetSerializer(serializers.ModelSerializer):
    docente_materia = DocentepdfMateriaSerializer(many=True,source='docente_grado')
    profesor=PersonacSerializer()
    docenteapoyo=PersonacSerializer()
    docenteorienta=PersonacSerializer()
    class Meta:
        model = Grados
        fields = ['nombre_grado', 'anual', 'sede', 'estudiantes', 'profesor', 'docente_materia','docenteapoyo','docenteorienta']

class ObjetivosgetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    materia=MateriasSerializer()
    class Meta:
        model = Objetivos
        fields = ['id','metas', 'evaluacion', 'piar', 'materia']

class RazonablesgetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    materia=MateriasSerializer()
    class Meta:
        model = Razonables
        fields = ['id', 'ajustes', 'didacticos', 'evaluacion', 'adicionales', 'casa', 'piar', 'materia']

class PiargetSerializer(serializers.ModelSerializer):
    piar_contexto = ContextogenaralSerializer(many=True, read_only=True)
    piar_valoracion = ValoracionpedagogicaSerializer(many=True, read_only=True)
    piar_objetivos = ObjetivosgetSerializer(many=True, read_only=True)
    piar_rasonnables = RazonablesgetSerializer(many=True, read_only=True)
    sede = SedeSerializer()
    estudiante=PersonacSerializer()
    grado=GradosgetSerializer()
    class Meta:
        model = Piar
        fields = [
            'id', 'nombre', 'anual', 'sede', 'grado', 'estudiante',
            'createdAt', 'updatedAt',
            'piar_contexto', 'piar_valoracion', 'piar_objetivos', 'piar_rasonnables'
        ]

class PiarSoporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piar
        fields = ['soporte']  # Solo se incluye el campo 'soporte'

