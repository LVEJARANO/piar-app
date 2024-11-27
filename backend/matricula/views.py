from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import GradosSerializer, SedeSerializer, AnualSerializer, MateriasSerializer, GradoslistSerializer, \
    EstudianteGradoSerializer, DiagnosticoSerializer, PiarSerializer, ContextogenaralSerializer, RazonablesSerializer, \
    RazonablesgetSerializer,ObjetivosgetSerializerget,PiargetSerializer,GradosSerializerpost, \
    ValoracionpedagogicaSerializer, ValoracionpedagogicagetSerializer, ObjetivosSerializer,PiarSoporteSerializer
from .models import Grados, Sede, Anual, Materias, Diagnostico, Piar, Contextogenaral, Valoracionpedagogica, Objetivos, \
    Razonables, Docente_Materia
from rest_framework.views import APIView
from usuarios.models import Persona
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

from drf_spectacular.utils import extend_schema  # Importación correcta


# Vista para manejar los objetos de Sede
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def sede_view(request, id=None):
    if request.method == 'GET':
        if id:
            try:
                sede = Sede.objects.get(id=id)
                serializer = SedeSerializer(sede)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Sede.DoesNotExist:
                return Response({'error': 'Sede no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        else:
            sedes = Sede.objects.all()
            serializer = SedeSerializer(sedes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = SedeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            sede = Sede.objects.get(id=id)
        except Sede.DoesNotExist:
            return Response({'error': 'Sede no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SedeSerializer(sede, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            sede = Sede.objects.get(id=id)
            sede.delete()
            return Response({'message': 'Sede eliminada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        except Sede.DoesNotExist:
            return Response({'error': 'Sede no encontrada'}, status=status.HTTP_404_NOT_FOUND)


# Vista para manejar los objetos de Anual
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
def anual_view(request, id=None):
    if request.method == 'GET':
        if id:
            try:
                anual = Anual.objects.get(id=id)
                serializer = AnualSerializer(anual)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Anual.DoesNotExist:
                return Response({'error': 'Anual no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            anuales = Anual.objects.all()
            serializer = AnualSerializer(anuales, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = AnualSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            anual = Anual.objects.get(id=id)
        except Anual.DoesNotExist:
            return Response({'error': 'Anual no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnualSerializer(anual, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            anual = Anual.objects.get(id=id)
            anual.delete()
            return Response({'message': 'Anual eliminado exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        except Anual.DoesNotExist:
            return Response({'error': 'Anual no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# Vista para manejar los objetos de Materias
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def materias_view(request, id=None):
    if request.method == 'GET':
        if id:
            try:
                materia = Materias.objects.get(id=id)
                serializer = MateriasSerializer(materia)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Materias.DoesNotExist:
                return Response({'error': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        else:
            materias = Materias.objects.all()
            serializer = MateriasSerializer(materias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = MateriasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            materia = Materias.objects.get(id=id)
        except Materias.DoesNotExist:
            return Response({'error': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MateriasSerializer(materia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            materia = Materias.objects.get(id=id)
            materia.delete()
            return Response({'message': 'Materia eliminada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        except Materias.DoesNotExist:
            return Response({'error': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)


@extend_schema(responses=GradosSerializer)
@api_view(['POST', 'PUT', 'GET'])
@permission_classes((IsAuthenticated,))
def manejar_grado(request, id=None):
    if request.method == 'POST':  # Crear nuevo Grado
        serializer = GradosSerializerpost(data=request.data)
        if serializer.is_valid():
            grado = serializer.save()  # Guardamos el objeto sin los estudiantes

            # Asignamos los estudiantes usando .set() después de guardar
            if 'estudiantes' in request.data:
                grado.estudiantes.set(request.data['estudiantes'])

            return Response({
                'message': 'Grado creado exitosamente',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':  # Editar Grado existente

        try:

            grado = Grados.objects.get(id=id)

        except Grados.DoesNotExist:

            return Response({'error': 'Grado no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GradosSerializer(grado, data=request.data)

        if serializer.is_valid():

            grado = serializer.save()  # Guardamos el objeto sin los estudiantes

            # Actualizamos los estudiantes usando .set() después de guardar

            if 'estudiantes' in request.data:
                grado.estudiantes.set(request.data['estudiantes'])

            # Actualizamos las relaciones de Docente_Materia

            if 'docente_materia' in request.data:

                for docente_data in request.data['docente_materia']:

                    profesor_id = docente_data.get('profesor')

                    materias = docente_data.get('materias', [])

                    try:

                        # Obtener la instancia de Persona asociada al profesor_id

                        profesor_instance = Persona.objects.get(id=profesor_id)

                        # Verificar si ya existe una relación de Docente_Materia

                        docente_materia_instance = Docente_Materia.objects.filter(

                            id_grado=grado, profesor=profesor_instance

                        ).first()

                        if docente_materia_instance:

                            # Si la relación ya existe, actualizamos las materias asociadas

                            docente_materia_instance.materias.set(materias)

                        else:

                            # Si no existe, creamos una nueva relación Docente_Materia

                            docente_materia_instance = Docente_Materia.objects.create(

                                id_grado=grado,

                                profesor=profesor_instance

                            )

                            docente_materia_instance.materias.set(materias)

                    except Persona.DoesNotExist:

                        return Response(

                            {'error': f"El profesor con ID {profesor_id} no existe."},

                            status=status.HTTP_400_BAD_REQUEST

                        )

            return Response({

                'message': 'Grado actualizado exitosamente',

                'data': serializer.data

            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':  # Obtener Grado por ID
        try:
            grado = Grados.objects.get(id=id)
        except Grados.DoesNotExist:
            return Response({'error': 'Grado no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GradosSerializer(grado)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def listar_grados(request):
    anual_id = request.query_params.get('anual')  # Obtener el parámetro 'anual' de la URL
    sede_id = request.query_params.get('sede')  # Obtener el parámetro 'sede' de la URL

    # Filtrar grados en base a 'anual' y 'sede' si están presentes
    grados = Grados.objects.all()
    if anual_id is not None:
        grados = grados.filter(anual__id=anual_id)  # Filtrar por el ID de 'anual'
    if sede_id is not None:
        grados = grados.filter(sede__id=sede_id)  # Filtrar por el ID de 'sede'

    # Serializar los grados filtrados
    serializer = GradoslistSerializer(grados, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def listar_grados_filtrados(request):
    # Obtener parámetros de filtro desde la URL
    anual_id = request.query_params.get('anual')
    sede_id = request.query_params.get('sede')
    grado_id = request.query_params.get('id')

    # Validar que todos los parámetros estén presentes
    if not (anual_id and sede_id and grado_id):
        return Response(
            {"error": "Debe proporcionar los parámetros 'anual', 'sede' e 'id' para realizar la búsqueda."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Filtrar los grados según los parámetros proporcionados
    queryset = Grados.objects.filter(anual_id=anual_id, sede_id=sede_id, id=grado_id)

    # Serializar el queryset
    serializer = EstudianteGradoSerializer(queryset, many=True)
    if not serializer.data:
        return Response(
            {"error": "No se encontraron grados con los filtros proporcionados."},
            status=status.HTTP_404_NOT_FOUND
        )
    return Response(serializer.data[0], status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def diagnostico_list(request):
    if request.method == 'GET':
        diagnosticos = Diagnostico.objects.all()
        serializer = DiagnosticoSerializer(diagnosticos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DiagnosticoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def diagnostico_detail(request, pk=None):
    if request.method == 'GET':
        # Si se pasa un parámetro 'persona', se filtra por ese parámetro
        persona_id = request.query_params.get('persona', None)
        if persona_id:
            # Filtrar los diagnósticos por persona
            diagnosticos = Diagnostico.objects.filter(persona_id=persona_id)
            serializer = DiagnosticoSerializer(diagnosticos, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "Persona ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # Buscar el diagnóstico por 'pk' (ID del diagnóstico)
        try:
            diagnostico = Diagnostico.objects.get(pk=pk)
        except Diagnostico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = DiagnosticoSerializer(diagnostico, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Eliminar el diagnóstico por 'pk' (ID del diagnóstico)
        try:
            diagnostico = Diagnostico.objects.get(pk=pk)
        except Diagnostico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        diagnostico.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def diagnostico_persona(request):
    # Filtramos por el id de la persona (sin necesidad de incluir el pk del diagnóstico)
    persona_id = request.query_params.get('persona', None)

    if persona_id is not None:
        # Filtramos los diagnósticos de esa persona
        diagnosticos = Diagnostico.objects.filter(persona__id=persona_id)

        if diagnosticos.exists():
            serializer = DiagnosticoSerializer(diagnosticos, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "No diagnósticos encontrados para esta persona."},
                            status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"detail": "El parámetro 'persona' es necesario."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def piar_list(request):
    if request.method == 'GET':
        # Obtener todos los parámetros de filtro desde la solicitud
        anual = request.query_params.get('anual')
        sede = request.query_params.get('sede')
        grado = request.query_params.get('grado')
        estudiante = request.query_params.get('estudiante')

        # Comprobar que todos los filtros están presentes
        if anual is None or sede is None or grado is None or estudiante is None:
            return Response(
                {"error": "Todos los filtros (anual, sede, grado, estudiante) son requeridos para la búsqueda."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Filtrar los registros de acuerdo a los parámetros proporcionados
        piars = Piar.objects.filter(anual=anual, sede=sede, grado=grado, estudiante=estudiante)

        # Pasar el contexto del request al serializador
        serializer = PiarSerializer(piars, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PiarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Obtener, actualizar o eliminar un registro específico de Piar
@api_view(['GET', 'PUT', 'DELETE'])
def piar_detail(request, pk):
    try:
        piar = Piar.objects.get(pk=pk)
    except Piar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PiarSerializer(piar)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PiarSerializer(piar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        piar.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def contextogenaral_list(request):
    if request.method == 'GET':
        contextos = Contextogenaral.objects.all()
        serializer = ContextogenaralSerializer(contextos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContextogenaralSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def contextogenaral_detail(request, pk):
    try:
        contexto = Contextogenaral.objects.get(pk=pk)
    except Contextogenaral.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContextogenaralSerializer(contexto)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ContextogenaralSerializer(contexto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        contexto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def contextogenaral_id(request, pk):
    try:
        contexto = Contextogenaral.objects.get(piar_id=pk)
    except Contextogenaral.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContextogenaralSerializer(contexto)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def valoracion_crud(request, pk=None):
    """
    Maneja las operaciones CRUD para Valoracionpedagogica.
    - GET (sin pk): Lista todas las valoraciones.
    - GET (con pk): Obtiene los detalles de una valoración específica.
    - POST: Crea una nueva valoración.
    - PUT: Actualiza una valoración existente.
    - DELETE: Elimina una valoración existente.
    """
    # GET (listar todas o una específica)
    if request.method == 'GET':
        if pk:  # Detalle
            try:
                valoracion = Valoracionpedagogica.objects.get(pk=pk)
            except Valoracionpedagogica.DoesNotExist:
                return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
            serializer = ValoracionpedagogicaSerializer(valoracion)
            return Response(serializer.data)
        else:  # Listar todas
            valoraciones = Valoracionpedagogica.objects.all()
            serializer = ValoracionpedagogicaSerializer(valoraciones, many=True)
            return Response(serializer.data)

    # POST (crear)
    elif request.method == 'POST':
        serializer = ValoracionpedagogicaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT (actualizar)
    elif request.method == 'PUT':
        try:
            valoracion = Valoracionpedagogica.objects.get(pk=pk)
        except Valoracionpedagogica.DoesNotExist:
            return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ValoracionpedagogicaSerializer(valoracion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE (eliminar)
    elif request.method == 'DELETE':
        try:
            valoracion = Valoracionpedagogica.objects.get(pk=pk)
        except Valoracionpedagogica.DoesNotExist:
            return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
        valoracion.delete()
        return Response({"mensaje": "Eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def listar_valoraciones_por_piar(request, piar_id):
    """
    Obtiene todas las valoraciones pedagógicas asociadas a un PIAR específico.
    """
    valoraciones = Valoracionpedagogica.objects.filter(piar_id=piar_id)
    if not valoraciones.exists():
        return Response({"error": "No se encontraron valoraciones para el PIAR proporcionado."},
                        status=status.HTTP_404_NOT_FOUND)
    serializer = ValoracionpedagogicagetSerializer(valoraciones, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def objetivos_list_create(request):
    if request.method == 'GET':
        objetivos = Objetivos.objects.all()
        serializer = ObjetivosSerializer(objetivos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ObjetivosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def objetivos_detail_update_delete(request, pk):
    try:
        objetivo = Objetivos.objects.get(pk=pk)
    except Objetivos.DoesNotExist:
        return Response({"error": "Objetivo no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ObjetivosSerializer(objetivo)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ObjetivosSerializer(objetivo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        objetivo.delete()
        return Response({"message": "Objetivo eliminado"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_materias_por_piar_desde_objetivos(request, piar_id):
    try:
        # Filtramos los Objetivos por el piar_id
        objetivos = Objetivos.objects.filter(piar__id=piar_id)

        # Serializamos los Objetivos, que incluirá las Materias relacionadas
        serializer = ObjetivosgetSerializerget(objetivos, many=True)

        return Response({
            'message': 'Objetivos y Materias obtenidos exitosamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    except Objetivos.DoesNotExist:
        return Response({'error': 'Objetivos no encontrados para este Piar'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def listar_crear_razonables(request):
    if request.method == 'GET':
        # Listar todos los registros de Razonables
        razonables = Razonables.objects.all()
        serializer = RazonablesSerializer(razonables, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # Crear un nuevo registro de Razonables
        serializer = RazonablesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def detalle_actualizar_eliminar_razonable(request, pk):
    try:
        razonable = Razonables.objects.get(pk=pk)
    except Razonables.DoesNotExist:
        return Response({'error': 'Razonable no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Obtener detalles de un registro específico
        serializer = RazonablesSerializer(razonable)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        # Actualizar un registro existente
        serializer = RazonablesSerializer(razonable, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Eliminar un registro
        razonable.delete()
        return Response({'message': 'Razonable eliminado'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_materias_por_piar_desde_rasonables(request, piar_id):
    try:
        # Filtramos los Objetivos por el piar_id
        objetivos = Razonables.objects.filter(piar__id=piar_id)

        # Serializamos los Objetivos, que incluirá las Materias relacionadas
        serializer = RazonablesgetSerializer(objetivos, many=True)

        return Response({
            'message': 'Objetivos y Materias obtenidos exitosamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    except Objetivos.DoesNotExist:
        return Response({'error': 'Objetivos no encontrados para este Piar'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_materias_por_estudiante(request):
    estudiante_id = request.GET.get('estudiante_id')
    anual_id = request.GET.get('anual_id')
    grado_id = request.GET.get('grado_id')
    sede_id = request.GET.get('sede_id')  # Nuevo parámetro

    # Verificar que todos los parámetros estén presentes
    if not (estudiante_id and anual_id and grado_id and sede_id):
        return Response(
            {"error": "Faltan parámetros: estudiante_id, anual_id, grado_id o sede_id"},
            status=400
        )

    # Filtrar el grado por anual, estudiante y sede
    try:
        grado = Grados.objects.get(
            id=grado_id,
            anual_id=anual_id,
            sede_id=sede_id,
            estudiantes__id=estudiante_id
        )
    except Grados.DoesNotExist:
        return Response(
            {"error": "No se encontró el grado con los parámetros especificados"},
            status=404
        )

    # Obtener las materias asociadas al grado
    docente_materias = Docente_Materia.objects.filter(id_grado=grado)
    materias = Materias.objects.filter(docente_materia__in=docente_materias).distinct()

    # Serializar las materias
    materias_serializadas = MateriasSerializer(materias, many=True)

    return Response(materias_serializadas.data)


class PiarDetailView(APIView):
    def get(self, request):
        piar_id = request.query_params.get('id')  # Obtener el ID de Piar desde los parámetros

        if not piar_id:
            return Response({"detail": "El parámetro 'id' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            piar = Piar.objects.prefetch_related(
                'piar_contexto', 'piar_valoracion', 'piar_objetivos', 'piar_rasonnables'
            ).get(id=piar_id)
        except Piar.DoesNotExist:
            return Response({"detail": "No se encontró un PIAR con el ID proporcionado."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PiargetSerializer(piar)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DiagnosticoDetailAPIView(APIView):
    def get(self, request, id):
        try:
            diagnostico = Diagnostico.objects.get(id=id)
            serializer = DiagnosticoSerializer(diagnostico)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Diagnostico.DoesNotExist:
            return Response({"error": "Diagnóstico no encontrado"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@parser_classes([MultiPartParser])
def update_piar_soporte(request, pk):
    try:
        # Buscar el objeto Piar por ID
        piar = Piar.objects.get(pk=pk)
    except Piar.DoesNotExist:
        return Response({"error": "Piar not found"}, status=status.HTTP_404_NOT_FOUND)

    # Serializar y validar solo el campo soporte
    serializer = PiarSoporteSerializer(piar, data=request.data, partial=True,context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Soporte updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)