""" Схема URL restAPI"""

from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^questions/$', views.QuestionList.as_view()),
    url(r'^questions/(?P<id>[0-9]+)/$', views.QuestionDetail.as_view()),
    url(r'^answers/$', views.AnswerList.as_view()),
    url(r'^answers-to-question/(?P<question_id>[0-9]+)/$', views.AnswersByQuestionId.as_view()),
    url(r'^patients/$', views.PatientList.as_view()),
    url(r'^patients-with-reviews/$', views.PatientWithReviewList.as_view()),
    url(r'^options/$', views.OptionList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)