from django.contrib import admin
from django.urls import path
from articles.views import archive, get_article, create_post, register, login_view, logout_view

urlpatterns = [
    path('', archive, name='archive'),
    path('article/<int:article_id>/', get_article, name='get_article'),
    path('article/new/', create_post, name='create_post'),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('admin/', admin.site.urls),
]