from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import *
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    # path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairView), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('verificar_sesion/', verificar_sesion, name='verificar_sesion'),
    path('programa_grupo_permiso/', programa_grupo_permiso, name='programa_grupo_permiso'),

    #persona
    path('personas/', PersonaDetailView.as_view(), name='persona_list'),
    path('personas/<int:pk>/', PersonaDetailView.as_view(), name='persona_detail'),
    path('selectpersonas/', PersonaSelectListView.as_view(), name='persona-select'),
    path('personasbuscar/<int:pk>/', PersonabuscarView.as_view(), name='persona_detaibuscarl'),

]