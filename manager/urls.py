""" Схема URL для приложения менеджера больницы """

from django.conf.urls import url
from django.contrib.auth.views import login
from . import views

urlpatterns = [
    # Главная страница менеджера со статистикой киоска
    url(r'^$', views.main, name='main'),
    # Страница авторизации
    url(r'^login/$', login, {'template_name':'manager/login.html'}, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    # Сгенерировать и отдать файл CSV
    url(r'^export$', views.csv_export, name='csv_export'),
]
