""" Схема URL для приложения О больнице"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Базовая страница с информацией о больнице
    url(r'^$', views.about, name='about'),
    url(r'^reference_hospital/$', views.reference_hospital, name='reference_hospital'),
    url(r'^maternity_hospital/$', views.maternity_hospital, name='maternity_hospital'),
    url(r'^women/$', views.women, name='women'),
    url(r'^schedule/$', views.schedule, name='schedule'),
    url(r'^reference_kdc/$', views.reference_kdc, name='reference_kdc'),
    url(r'^reference_pay/$', views.reference_pay, name='reference_pay'),
    url(r'^reception/$', views.reception, name='reception'),
    url(r'^rules/patients-rules/$', views.patients_rules, name='patients_rules'),
    url(r'^rules/ban/$', views.ban, name='ban'),
    url(r'^rules/product-allow/$', views.product_allow, name='product_allow'),
    url(r'^rules/product-disallow/$', views.product_disallow, name='product_disallow'),
    url(r'^rules/$', views.rules, name='rules'),
]
