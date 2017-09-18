from django.shortcuts import render
from django.shortcuts import get_object_or_404 #получение объекта из БД или возврат 404 ошибки 

from .models import Question, Answer, Patient

# Create your views here.

def reviews(request):
    """ Страница вывода всех вопросов и формы ответа на них """
    questions = Question.objects.all()
    temp_answer = Answer()

    context = {'questions':questions, 'answer':temp_answer,}
    return render(request, 'reviews/reviews.html', context)

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

            new_answer = Answer(question=question, patient=new_patient, rating=rating, comment=comment)
            new_answer.save()
        
        context = {'result':questions_id_list}
        return render(request, 'reviews/success.html', context)
