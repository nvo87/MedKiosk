#TODO убрать лишние колонки из БД, от старой версии анкетирования.

from django.db import models
from django.utils import timezone


# Create your models here.
class Question(models.Model):
    """ Вопросы, которые задаются пользователю"""
    # текст вопроса и каким по счету выводится этот вопрос
    text = models.TextField()
    #порядок вывода вопросов, 0 - стартовый вопрос
    sort_order = models.PositiveSmallIntegerField(null=True, blank=True)
    # уровень вложенности вопроса. 0 - корневые вопросы
    nesting_level = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        """ Возвращает строковое представление модели """
        return self.text

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"
        ordering = ['sort_order']


class Option(models.Model):
    """ Варианты ответов на вопросы """
    text = models.CharField(max_length=300)
    question = models.ForeignKey(Question)
    # id следующего вопроса, если выбран данный ответ
    next_question = models.ForeignKey(
        Question,
        #в базе может хранится null
        null=True,
        #поле в формах и в админке может оставаться пустым
        blank=True,
        #поведение объекта этой таблицы, когда объект в связанной модели удалят. SET_NULL - выставить в ноль
        on_delete=models.SET_NULL,
        #имя связи, нужно так как используем несколько ForeignKey и будет заменять связь FOO_set
        related_name='parent_options'
        )

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "Вариант ответа"
        verbose_name_plural = "Варианты ответов"


class Patient(models.Model):
    """ Пациент (пользователь терминала), отвечавший на вопросы """
    full_name = models.CharField(max_length=100, default='Аноним')
    phone = models.CharField(max_length=15, default='-')
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    # итоговый отзыв, который оставил пользователь
    review = models.TextField(default='-')

    def __str__(self):
        """ Возвращает строковое представление модели """
        return self.full_name + ", " + str(self.age) + " лет"

    class Meta:
        verbose_name = "Пациент"
        verbose_name_plural = "Пациенты"


class Answer(models.Model):
    """ Ответы от пользователей на конкретный вопрос """
    # id вопроса, к которому дан сам ответ, т.е. оценка и коммент.
    question = models.ForeignKey(Question)
    # id пользователя, который ответил на вопрос
    patient = models.ForeignKey(Patient)
    # id варианта ответа из таблицы ответов
    option = models.ForeignKey(
        Option,
        null=True,
        blank=True
        )
    # варианты ответов (шкала от 1 до 10)
    rating_choices = [(i, i) for i in range(1, 11)]
    # оценка от 1 до 10, которую поставил пациент
    rating = models.PositiveSmallIntegerField(
        choices=rating_choices, default=5)
    # комментарий к оценке на вопрос
    comment = models.TextField()
    date_added = models.DateTimeField(
        default=timezone.now)  # дата ответа

    def __str__(self):
        """ Возвращает строковое представление модели """
        if (self.comment):
            return str(self.rating) + " баллов - " + str(self.comment)
        else:
            return str(self.rating) + " баллов"

    class Meta:
        verbose_name = "Ответ"
        verbose_name_plural = "Ответы"
