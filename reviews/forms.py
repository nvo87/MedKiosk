from django import forms

from .models import Answer


class AnswerForm(forms.ModelForm):

    class Meta:
        model = Answer
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.RadioSelect(),
            'comment': forms.Textarea(attrs={'cols': 80})
        }
