from django.contrib import admin

# Register your models here.
from reviews.models import Answer, Patient, Question, Option


class AnswerModelAdmin(admin.ModelAdmin):
    """отображение модели в админке"""
    list_display = ["question", "patient",
                    "date_added"]  # какие колонки будут в админке для данной модели
    # на каких колонках будут ссылки
    list_display_links = ["date_added"]
    # какие колонки доступны для сортировки
    list_filter = ["question", "patient"]

    class Meta:
        model = Answer


class QuestionModelAdmin(admin.ModelAdmin):
    """отображение модели в админке"""
    list_display = ["text", "sort_order", "nesting_level"]  # какие колонки будут в админке для данной модели
    # на каких колонках будут ссылки
    list_display_links = ["text"]
    # какие колонки доступны для сортировки
    list_filter = ["text", "sort_order", "nesting_level"]
    list_editable = ["sort_order", "nesting_level"] # сделать значения быстро-редактируемыми

    class Meta:
        model = Question

class OptionModelAdmin(admin.ModelAdmin):
    """отображение модели в админке"""
    list_display = ["text", "question",
                    "next_question"]  # какие колонки будут в админке для данной модели
    # какие колонки доступны для сортировки
    list_filter = ["text", "question", "next_question"]
    # по каким параметрам будет поиск
    search_fields = ["question", "next_question"]
    # сделать значения быстро-редактируемыми
    list_editable = ["question", "next_question"]

    class Meta:
        model = Option


admin.site.register(Answer, AnswerModelAdmin)
admin.site.register(Patient)
admin.site.register(Question, QuestionModelAdmin)
admin.site.register(Option, OptionModelAdmin)
