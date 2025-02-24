from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RealisationSerializer, HomePageSerializer, PostSerializer
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User as Auth
from django.views import View
from rest_framework.response import Response
from .models import Realisation, Post
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import EmailMessage
from django.http import JsonResponse

import logging

# Create your views here.

class CreateUserView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        username = request.data['username']
        password = request.data['password']
        user = Auth(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'token': str(refresh.access_token)})
        return Response({'error': 'Invalid credentials'}, status=401)

class HomePageView(generics.GenericAPIView):
    serializer_class = HomePageSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        return render(request, 'index.html', )
    

class CreateRealisation(generics.ListCreateAPIView):

    serializer_class = RealisationSerializer
    permission_classes = [AllowAny] # IsAdminUser later 

    def get_queryset(self):
        # Získání všech realizací
        queryset = Realisation.objects.all()

        # Funkce pro extrakci roku z názvu
        def extract_year(title):
            try:
                # Pokusíme se získat první část názvu a převést ji na číslo
                year = int(title.split()[0])
                return year
            except (IndexError, ValueError):
                # Pokud rok nelze extrahovat, vrátíme velmi starý rok (např. 1900)
                return 25000

        # Seřazení podle roku extrahovaného z názvu
        queryset = sorted(queryset, key=lambda x: extract_year(x.title), reverse=True)

        return queryset
        
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeleteRealisation(generics.DestroyAPIView):
    serializer_class = RealisationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)
    
    def perform_destroy(self, instance):
        instance.delete()

class ShowRealisation(generics.ListAPIView):
    serializer_class = RealisationSerializer
    permission_classes = [AllowAny] # IsAdminUser later 

    def get_queryset(self):
        # Získání všech realizací
        queryset = Realisation.objects.all()

        # Funkce pro extrakci roku z názvu
        def extract_year(title):
            try:
                # Pokusíme se získat první část názvu a převést ji na číslo
                year = int(title.split()[0])
                return year
            except (IndexError, ValueError):
                # Pokud rok nelze extrahovat, vrátíme velmi starý rok (např. 1900)
                return 25000

        # Seřazení podle roku extrahovaného z názvu
        queryset = sorted(queryset, key=lambda x: extract_year(x.title), reverse=True)

        return queryset

class CreatePosts(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        realisation_id = self.kwargs['id']
        realisation = Realisation.objects.get(id=realisation_id)
        return realisation.posts.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            realisation_id = self.kwargs['id']
            realisation = Realisation.objects.get(id=realisation_id)
            post = serializer.save()
            realisation.posts.add(post)
            return Response(serializer.data, status=201)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=400)
        
logger = logging.getLogger(__name__)

class SendPDFEmailView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if 'pdf' not in request.FILES:
            return JsonResponse({'error': 'No file attached'}, status=400)

        pdf_file = request.FILES['pdf']
        email = 'tomaspenkava1@gmail.com'

        # Odeslání e-mailu s PDF přílohou
        email_message = EmailMessage(
            subject='Zakázkový formulář',
            body='Zasíláme vygenerované PDF ze zakázkového formuláře.',
            to=[email],
        )
        email_message.attach(pdf_file.name, pdf_file.read(), 'application/pdf')
        email_message.send()

        return JsonResponse({'message': 'E-mail byl úspěšně odeslán.'})