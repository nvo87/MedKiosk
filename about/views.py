from django.shortcuts import render

# Create your views here.
def about(request):
    return render(request, 'about/about.html')

def reference_hospital(request):
    return render(request, 'about/reference_hospital.html')

def maternity_hospital(request):
    return render(request, 'about/maternity_hospital.html')

def women(request):
    return render(request, 'about/women.html')

def schedule(request):
    return render(request, 'about/schedule.html')

def reference_kdc(request):
    return render(request, 'about/reference_kdc.html')

def reference_pay(request):
    return render(request, 'about/reference_pay.html')

def reception(request):
    return render(request, 'about/reception.html')
    
def rules(request):
    return render(request, 'about/rules.html')

def patients_rules(request):
    return render(request, 'about/rules/patients-rules.html')

def ban(request):
    return render(request, 'about/rules/ban.html')

def product_allow(request):
    return render(request, 'about/rules/product-allow.html')

def product_disallow(request):
    return render(request, 'about/rules/product-disallow.html')