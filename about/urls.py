""" Схема URL для приложения О больнице"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Базовая страница с информацией о больнице
    url(r'^$', views.about, name='about'),
]
