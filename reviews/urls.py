""" Схема URL для приложения reviews (отзывы)"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Домашняя страница
    url(r'^$', views.index, name='index'),
    # Страница со списком вопросов
    url(r'^questions/$', views.questions, name='questions'),
    # Страница отдельного ответа
    url(r'^questions/(?P<question_id>\d+)/$',
        views.question, name='question'),
    # Страница-опросник (форма ответа на вопрос с конкретным id)
    url(r'^quiz/(?P<question_id>\d+)/$', views.quiz, name='quiz'),
    # Страница со всеми вопросами и формой ответов на них
    url(r'^polls/$', views.polls, name='polls'),
    # Страница благодарности
    url(r'^success/$', views.success, name='success'),
]
