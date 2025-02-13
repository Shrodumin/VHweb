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
        user = self.request.user
        return Realisation.objects.all()  # or filter by user if needed
        
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
        user = self.request.user
        
        return Realisation.objects.all()  # or filter by user if needed

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