from django.contrib import admin
from portfolio.models import Proyecto, ImagenProyecto, Tecnologia

# Register your models here.
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'en_progreso', 'link')
    search_fields = ('titulo', 'descripcion')
    list_filter = ('en_progreso',)
    filter_horizontal = ('tecnologias',)

class ImagenProyectoAdmin(admin.ModelAdmin):
    list_display = ('proyecto', 'imagen')
    search_fields = ('proyecto__titulo',) 
    
class TecnologiaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'icono_class')
    search_fields = ('nombre',)
    
admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(ImagenProyecto, ImagenProyectoAdmin)
admin.site.register(Tecnologia, TecnologiaAdmin)