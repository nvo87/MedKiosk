""" Схема URL для приложения map"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Страница с картой всей больницы
    url(r'^$', views.map, name='map'),
    url(r'^main-building/$', views.main_building, name='main_building'),
    url(r'^therap-building/$', views.therap_building, name='therap_building'),
]
