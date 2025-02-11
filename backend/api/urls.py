from django.urls import path
from . import views

urlpatterns = [
    path('realisations/', views.CreateRealisation.as_view(), name='realisation_add'),
    path('realisations/<int:id>/', views.DeleteRealisation.as_view(), name='realisation_delete'),
    path('realisations/<int:id>/posts', views.CreatePosts.as_view(), name='posts_add'),
]