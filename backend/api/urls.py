from django.urls import path
from . import views

urlpatterns = [
    path('realisations/', views.ShowRealisation.as_view(), name='realisations'),
    path('realisations/add', views.CreateRealisation.as_view(), name='realisation_add'),
    path('realisations/<int:id>/', views.DeleteRealisation.as_view(), name='realisation_delete'),
    path('realisations/<int:id>/posts', views.CreatePosts.as_view(), name='posts_add'),
    path('realisations/<int:id>/posts/add', views.CreatePosts.as_view(), name='posts_add'),
]