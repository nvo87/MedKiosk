from django.shortcuts import render
from django.shortcuts import get_object_or_404 #получение объекта из БД или возврат 404 ошибки 
# from django.http import HttpResponse # для ответа на запрос напрямую из views.py
from .models import Question

# Create your views here.

# Пример ответа напрямую из views.py
# def index(request):
# 	""" Домашняя страница приложения reviews (отзывы) """
# 	return HttpResponse("<h1>Это главная страница</h1>")

def index(request):
	""" Домашняя страница приложения reviews (отзывы) """
	return render(request, 'reviews/index.html')

def questions(request):
	""" Страница со списком вопросов"""
	questions = Question.objects.order_by('sort_order')
	context = {'questions': questions}
	return render(request, 'reviews/questions.html', context)

def question(request, question_id):
	""" Страница отдельного вопроса """
	# question = Question.objects.get(id=question_id) # обычный способ получения объекта
	question = get_object_or_404(Question, id=question_id) # получение объекта по id или возврат 404 ошибки
	answers = question.answer_set.all() # answer_set - получает все данные модели Answer через отношение связанного ключа
	
	context = {'question': question, 'answers': answers}
	return render(request, 'reviews/question.html', context)
