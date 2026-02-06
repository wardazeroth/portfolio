from django.db import models

# Create your models here.
class Proyecto(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    en_progreso = models.BooleanField(default=True)
    link = models.URLField(blank=True, null=True)
    imgPrincipal = models.ImageField(upload_to='proyectos/', blank=True, null=True)
    repositorio = models.URLField(blank=True, null=False)
    tecnologias = models.ManyToManyField('Tecnologia', related_name='proyectos')

    def __str__(self):
        return self.titulo
    
class ImagenProyecto(models.Model):
    proyecto = models.ForeignKey(Proyecto, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='proyectos/')

    def __str__(self):
        return f"Imagen de {self.proyecto.titulo}"
    
class Tecnologia(models.Model):
    nombre = models.CharField(max_length=50)
    icono_class = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.nombre