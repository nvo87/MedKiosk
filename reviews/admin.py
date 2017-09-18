from django.contrib import admin

# Register your models here.
from reviews.models import Answer, Patient, Question

class AnswerModelAdmin(admin.ModelAdmin):
	"""отображение модели в админке"""
	list_display = ["question","rating", "comment","patient", "date_added"]	# какие колонки будут в админке для данной модели
	list_display_links = ["rating", "date_added"]	# на каких колонках будут ссылки
	list_filter = ["question", "rating", "patient"]	# какие колонки доступны для сортировки
	search_fields = ["rating", "comment"]  # по каким параметрам будет поиск
	# list_editable = ["comment"] # сделать значения быстро-редактируемыми

	class Meta:
		model = Answer


admin.site.register(Answer, AnswerModelAdmin)
admin.site.register(Patient)
admin.site.register(Question)
