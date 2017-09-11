from django.shortcuts import render
from django.shortcuts import get_object_or_404 #получение объекта из БД или возврат 404 ошибки 
from django.http import HttpResponseRedirect 
from django.core.urlresolvers import reverse #определяет URL по заданной схеме URl
# from django.http import HttpResponse # для ответа на запрос напрямую из views.py

from .models import Question, Answer, Patient
from .forms import AnswerForm

# Create your views here.

# Пример ответа напрямую из views.py
# def index(request):
#   """ Домашняя страница приложения reviews (отзывы) """
#   return HttpResponse("<h1>Это главная страница</h1>")

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

def quiz(request, question_id=1):
    """ Страница ответа на вопрос с определенным id """
    question = Question.objects.get(id=question_id)
    patient = Patient.objects.get(id=1)

    if 'POST' != request.method:
        #Данные не отправлялись, создается пустая форма.
        form = AnswerForm()
    else:
        #Отправлены данные POST, обработать данные.
        form = AnswerForm(data=request.POST)
        if form.is_valid():
            new_entry = form.save(commit=False)
            new_entry.question_id = question
            new_entry.patient_id = patient
            new_entry.save()
            return HttpResponseRedirect(reverse('reviews:index'))

    context = {'question':question, 'form':form}
    return render(request, 'reviews/quiz.html', context)

def polls(request):
    """ Страница вывода всех вопросов и формы ответа на них """
    questions = Question.objects.all()
    # answers = Answer.objects.all()
    temp_answer = Answer()

    context = {'questions':questions, 'answer':temp_answer,}
    return render(request, 'reviews/polls.html', context)

def success(request):
    """ Благодарность за ответ и обработка полученных данных """
    
    # Из формы ответы на вопрос для конкретного ответа приходят в значениях q{{question.id}}.  Для перебора по всем таким именам, функция формирует список [q1, q2, q10,...]
    def get_formatted_id_list(query_set_object, format_str=''):
        formatted_id_list = []
        for item in query_set_object:
            formatted_id_list.append(format_str+str(item.id))
        return formatted_id_list

    if 'POST' != request.method:
        #Данные не отправлялись, создается пустая форма.
        pass
    else:
        #Отправлены данные POST, обработать данные.
        form = request.POST
        questions = Question.objects.all()
        questions_id_list = get_formatted_id_list(questions, 'q')

        new_patient = Patient()
        new_patient.full_name = form['p_name']
        new_patient.phone = form['p_phone']
        new_patient.review = form['p_review']
        new_patient.age = form['p_age']
        new_patient.save()

        for question_id_item in questions_id_list:
            # из hidden-поля для соответсвуюещго вопроса получаем значение id
            question_id = int(form[question_id_item])
            question = Question.objects.get(id=question_id)
            rating = int(form['rating_'+question_id_item])
            comment = form['comment_'+question_id_item]

            new_answer = Answer(question_id=question, patient_id=new_patient, rating=rating, comment=comment)
            new_answer.save()
        
        context = {'result':questions_id_list}
        return render(request, 'reviews/success.html', context)
