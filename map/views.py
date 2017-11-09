from django.shortcuts import render

# Create your views here.
def map(request):
    return render(request, 'map/map.html')

def main_building(request):
    return render(request, 'map/main-build.html')

def therap_building(request):
    return render(request, 'map/therap-build.html')