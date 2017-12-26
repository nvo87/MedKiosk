from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from reviews.models import Question, Answer, Patient, Option
from .serializers import QuestionSerializer, AnswerSerializer, PatientSerializer, OptionSerializer
from django.http import Http404


class QuestionList(APIView):

    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetail(APIView):

    def get_object(self, id):
        try:
            return Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, id):
        snippet = self.get_object(id)
        serializer = QuestionSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, id):
        snippet = self.get_object(id)
        serializer = QuestionSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        snippet = self.get_object(id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AnswerList(APIView):

    def get(self, request):
        answers = Answer.objects.all()
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswersByQuestionId(APIView):

    def get(self, request, question_id):
        question = Question.objects.get(id=question_id)
        answers = question.answer_set.all()
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)        


class PatientList(APIView):

    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)


class PatientWithReviewList(APIView):

    def get(self, request):
        patients = Patient.objects.exclude(review='-')
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

class OptionList(APIView):

    def get(self, request):
        options = Option.objects.all()
        serializer = OptionSerializer(options, many=True)
        return Response(serializer.data)