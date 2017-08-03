from django.shortcuts import render
from .models import Question

# Create your views here.
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
	question = Question.objects.get(id=question_id)
	answers = question.answer_set.all() # answer_set - получает все данные модели Answer через отношение связанного ключа
	context = {'question': question, 'answers': answers}
	return render(request, 'reviews/question.html', context)
