from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Usuario),
admin.site.register(ModuloGrupoPermiso),
admin.site.register(Modulo),
admin.site.register(SubModulo),