from django.contrib import admin

# Register your models here.
from reviews.models import Answer, Patient, Question
admin.site.register(Answer)
admin.site.register(Patient)
admin.site.register(Question)
