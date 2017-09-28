""" Схема URL для приложения менеджера больницы """

from django.conf.urls import url
from . import views

urlpatterns = [
    # Главная страница менеджера со статистикой киоска
    url(r'^$', views.main, name='main'),
]
