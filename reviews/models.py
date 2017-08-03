from django.db import models

# Create your models here.
class Question(models.Model):
	""" Вопросы, которые задаются пользователю"""
	text = models.CharField(max_length=300) # текст вопроса
	sort_order = models.PositiveSmallIntegerField() # каким по счету выводится этот вопрос
	def __str__(self):
		""" Возвращает строковое представление модели """
		return self.text

	class Meta:
		verbose_name 		= "Вопрос"
		verbose_name_plural = "Вопросы"

class Patient(models.Model):
	""" Пациент (пользователь терминала), отвечавший на вопросы """
	full_name = models.CharField(max_length=100)
	phone = models.CharField(max_length=15)
	age = models.PositiveSmallIntegerField()
	review = models.TextField() # итоговый отзыв, который оставил пользователь
	def __str__(self):
		""" Возвращает строковое представление модели """
		return self.full_name + ", " + str(self.age) + " лет"

	class Meta:
		verbose_name 		= "Пациент"
		verbose_name_plural = "Пациенты"

class Answer(models.Model):
	""" Ответы от пользователей на конкретный вопрос """
	question_id = models.ForeignKey(Question) # id вопроса, к которому дан сам ответ, т.е. оценка и коммент.
	rating = models.PositiveSmallIntegerField() # оценка от 1 до 10, которую поставил пациент
	comment = models.TextField()	# комментарий к оценке на вопрос
	date_added = models.DateTimeField(auto_now_add=True) # дата ответа
	patient_id = models.ForeignKey(Patient) # id пользователя, который ответил на вопрос
	def __str__(self):
		""" Возвращает строковое представление модели """
		if (self.comment):
			return str(self.rating) + " баллов" + " - " + self.comment
		else:
			return str(self.rating)

	class Meta:
		verbose_name 		= "Ответ"
		verbose_name_plural = "Ответы"