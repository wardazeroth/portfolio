from django.shortcuts import render
from datetime import datetime
from portfolio.models import Proyecto, ImagenProyecto


# Create your views here.
def index(request):
    hr = datetime.now().hour
    hora = datetime.now().strftime("%H:%M") 
    if hora < '12:00':
        mensaje = '¡Buenos días!'
    elif hora >= '12:00' and hora < '20:00':  
        mensaje = '¡Buenas tardes!' 
    else:
        mensaje = '¡Buenas noches!'
        
    projects = Proyecto.objects.all()
    
    return render(request, 'index.html', {'mensaje': mensaje, 'projects': projects})

def contacto(request):
    return render(request, 'contact.html') 