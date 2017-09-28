from django.shortcuts import render
from django.shortcuts import get_object_or_404 #получение объекта из БД или возврат 404 ошибки 

from reviews.models import Question

def main(request):
    ''' Стартовая страница панели менеджера со статистикой работы киоска '''
    questions = Question.objects.all();
    context = {'questions':questions,}
    return render(request, 'manager/main.html', context)