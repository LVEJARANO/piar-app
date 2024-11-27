from django.urls import path
from .views import manejar_grado, materias_view, anual_view, sede_view, listar_grados, listar_grados_filtrados, \
    diagnostico_list, diagnostico_detail, diagnostico_persona, piar_list, piar_detail, contextogenaral_list, \
    contextogenaral_detail, contextogenaral_id, valoracion_crud, listar_valoraciones_por_piar, objetivos_list_create, \
    objetivos_detail_update_delete, get_materias_por_estudiante, get_materias_por_piar_desde_objetivos, \
    listar_crear_razonables, detalle_actualizar_eliminar_razonable, get_materias_por_piar_desde_rasonables, \
    PiarDetailView, DiagnosticoDetailAPIView,update_piar_soporte

urlpatterns = [
    # Rutas para Sede
    path('sede/', sede_view, name='sede_list'),  # GET para listar todas las sedes, POST para crear nueva sede
    path('sede/<int:id>/', sede_view, name='sede_detail'),  # GET, PUT, DELETE por ID

    # Rutas para Anual
    path('anual/', anual_view, name='anual_list'),
    # GET para listar todas las anualidades, POST para crear nueva anualidad
    path('anual/<int:id>/', anual_view, name='anual_detail'),  # GET, PUT, DELETE por ID

    # Rutas para Materias
    path('materias/', materias_view, name='materias_list'),
    # GET para listar todas las materias, POST para crear nueva materia
    path('materias/<int:id>/', materias_view, name='materias_detail'),  # GET, PUT, DELETE por ID

    path('grados/', manejar_grado, name='crear_grado'),  # Crear nuevo grado
    path('grados/<int:id>/', manejar_grado, name='editar_grado'),  # Editar o obtener grado por ID
    path('list_grados/', listar_grados, name='listar_grados'),  # Ruta para listar grados
    path('estudiantes_filtrados/', listar_grados_filtrados, name='listar_grados_filtrados'),

    path('diagnosticos/', diagnostico_list, name='diagnostico-list'),
    path('diagnosticos_persona/', diagnostico_persona, name='diagnostico-persona'),
    path('diagnostico/<int:pk>/', diagnostico_detail, name='diagnostico-detail'),

    path('piar/', piar_list, name='piar_list'),
    path('piars/<int:pk>/', piar_detail, name='piar_detail'),

    path('contextogenaral/', contextogenaral_list, name='contextogenaral-list'),
    path('contextogenaralid/<int:pk>/', contextogenaral_detail, name='contextogenaral-detail'),
    path('contextogenaral_id/<int:pk>/', contextogenaral_id, name='contextogenaral-detail_id'),

    path('valoraciones/', valoracion_crud, name='listar_crear_valoraciones'),  # Para listar y crear
    path('valoraciones/<int:pk>/', valoracion_crud, name='detalle_crud_valoracion'),
    # Para detalle, actualizar y eliminar
    path('valoraciones_id/<int:piar_id>/', listar_valoraciones_por_piar, name='listar_valoraciones_por_piar'),

    path('objetivos/', objetivos_list_create, name='objetivos-list-create'),
    path('objetivos/<int:pk>/', objetivos_detail_update_delete, name='objetivos-detail-update-delete'),

    path('materias-por-estudiante/', get_materias_por_estudiante, name='materias_por_estudiante'),
    path('por_piar_desde_objetivos/<int:piar_id>/', get_materias_por_piar_desde_objetivos,
         name='get_materias_por_piar_desde_objetivos'),

    path('razonables/', listar_crear_razonables, name='listar_crear_razonables'),
    path('razonables/<int:pk>/', detalle_actualizar_eliminar_razonable, name='detalle_actualizar_eliminar_razonable'),
    path('por_piar_desde_rasonables/<int:piar_id>/', get_materias_por_piar_desde_rasonables,
         name='get_materias_por_piar_desde_rasonables'),

    path('piarpdf/', PiarDetailView.as_view(), name='piar-detailpdf'),
    path('diagnosticoid/<int:id>/', DiagnosticoDetailAPIView.as_view(), name='diagnostico-detail'),

    path('updatesoporte/<int:pk>/', update_piar_soporte, name='piar-update-soporte'),
]
