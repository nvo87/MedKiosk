from django.db import models
from django.utils import timezone


# Create your models here.
class Question(models.Model):
    """ Вопросы, которые задаются пользователю"""
    # текст вопроса каким по счету выводится этот вопрос
    text = models.CharField(max_length=300)  
    sort_order = models.PositiveSmallIntegerField()

    def __str__(self):
        """ Возвращает строковое представление модели """
        return self.text

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"


class Patient(models.Model):
    """ Пациент (пользователь терминала), отвечавший на вопросы """
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    age = models.PositiveSmallIntegerField()
    # итоговый отзыв, который оставил пользователь
    review = models.TextField()

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
