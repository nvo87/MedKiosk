""" Схема URL для приложения map"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Страница с картой всей больницы
    url(r'^$', views.map, name='map'),
]
