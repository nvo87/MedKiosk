from rest_framework import serializers
from reviews.models import Question, Answer, Patient, Option


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        # fields = ('text')
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = '__all__'
        depth = 1


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = '__all__'



class OptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Option
        fields = '__all__'
