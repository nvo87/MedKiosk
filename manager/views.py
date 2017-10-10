import xlwt

from django.http import HttpResponse
from django.shortcuts import render
# получение объекта из БД или возврат 404 ошибки
from django.shortcuts import get_object_or_404

from reviews.models import Question, Answer


def main(request):
    ''' Стартовая страница панели менеджера со статистикой работы киоска '''
    questions = Question.objects.all()
    context = {'questions': questions, }
    return render(request, 'manager/main.html', context)

def csv_export(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="stat.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    sheet1 = wb.add_sheet('Все ответы и комментарии')

    columns = ['Вопрос', 'Оценка', 'Комментарий', 'Пациент', 'Возраст', 'Отзыв']
    
    sheet1.col(0).width = 256*35    # 20 characters wide (-ish)
    sheet1.col(1).width = 256*12    
    sheet1.col(2).width = 256*30
    sheet1.col(3).width = 256*25    
    sheet1.col(4).width = 256*12    
    sheet1.col(5).width = 256*50    

    sheet1.panes_frozen = True
    sheet1.remove_splits = True
    # sheet1.vert_split_pos = 1
    sheet1.horz_split_pos = 1
    # sheet1.vert_split_first_visible = 1
    sheet1.horz_split_first_visible = 1

    # Стили для заглавной строки.
    row_num = 0

    style = xlwt.XFStyle()
    style.font.bold = True
    style.font.height = 20*14     # 14 pt
    style.borders.bottom = 6

    for col_num in range(len(columns)):
        sheet1.write(row_num, col_num, columns[col_num], style)


    # Основные данные
    style = xlwt.XFStyle()

    rows = Answer.objects.order_by('question', 'rating').values_list('question__text', 'rating', 'comment', 'patient__full_name', 'patient__age', 'patient__review')

    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            sheet1.write(row_num, col_num, row[col_num], style)

    wb.save(response)
    return response