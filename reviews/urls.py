""" Схема URL для приложения reviews (отзывы)"""

from django.conf.urls import url
from . import views

urlpatterns = [
    # Страница со всеми вопросами и формой ответов на них
    url(r'^$', views.reviews, name='reviews'),
    # Страница благодарности и сохранения результата опроса
    url(r'^success/$', views.success, name='success'),
]
