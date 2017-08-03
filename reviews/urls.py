""" Схема URL для приложения reviews (отзывы)"""

from django.conf.urls import url
from . import views

urlpatterns = [
	#Домашняя страница
	url(r'^$', views.index, name='index'),
	#Страница со списком вопросов
	url(r'^questions/$', views.questions, name='questions'),
	url(r'^questions/(?P<question_id>\d+)/$', views.question, name='question'),
]