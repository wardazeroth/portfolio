from django.contrib import admin
from portfolio.models import Proyecto, ImagenProyecto

# Register your models here.
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'en_progreso', 'link')
    search_fields = ('titulo', 'descripcion')
    list_filter = ('en_progreso',)
    
class ImagenProyectoAdmin(admin.ModelAdmin):
    list_display = ('proyecto', 'imagen')
    search_fields = ('proyecto__titulo',)  
    
admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(ImagenProyecto, ImagenProyectoAdmin)