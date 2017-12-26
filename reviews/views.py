from django.shortcuts import render
from django.shortcuts import get_object_or_404 #получение объекта из БД или возврат 404 ошибки 

from .models import Question, Option, Answer, Patient

# Create your views here.

def reviews(request):
    """ Страница выбора между анкетой и только отзывом """
    return render(request, 'reviews/reviews.html')

def review(request):
    """ Страница вывода только формы отзыва """
    return render(request, 'reviews/review.html')

def poll(request):
    """ Страница вывода всех вопросов анкеты и формы отзыва """
    def get_answer_from_form(form):
        question = Question.objects.get(id=form['questionId'])
        option = Option.objects.get(id=form['optionId'])
        patient = Patient.objects.get(id=form['patientId'])
        return Answer(
            question=question, 
            patient=patient, 
            option=option, 
            )
    
    questions = Question.objects.all()

    if 'POST' != request.method:
        # Данные не отправлялись, создается пустая форма.
        # Новый пользователь-аноним, на время "сессии" анкетирования
        patient = Patient()
        patient.save()
        # Метка для первого вопроса sort_order=0
        question = questions.get(sort_order=0)
    else:
        form = request.POST
        answer = get_answer_from_form(form)
        answer.save()
        patient = answer.patient
        # Если для выбранной опции существует следующий вопрос, то продолжаем, иначе конец анкеты
        if (answer.option.next_question):           
            # id след.вопроса указан в таблице Options для каждого option
            question = answer.option.next_question
        else:
            # Если нет след.вопроса, то идет страница отзыва и данных пациента. Передаем id пока еще анонимного пациента.
            context = {'patient':patient}
            return render(request, 'reviews/review.html', context)

    options = question.option_set.all()

    context = {
        'question':question,
        'options':options, 
        'patient':patient,
    }

    return render(request, 'reviews/poll.html', context)


def success(request):
    """ Благодарность за ответ и обработка полученных данных """
    if 'POST' != request.method:
        # Данные не отправлялись, создается пустая форма.
        pass
    else:
        # Отправлены данные POST, обработать данные.
        form = request.POST
        patient_id = form['patientId']
        # Если на эту страницу попали после анкеты, то уже заведен новый пациент, и его id было заранее передано в форму в скрытый инпут. Если оставляют только отзыв (без анкеты), тогда создаем нового пациента.
        if (patient_id):
            patient = Patient.objects.get(id=patient_id)
        else:
            patient = Patient()

        patient.review = form['p_review']
        patient.save()

        return render(request, 'reviews/success.html')