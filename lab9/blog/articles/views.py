from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import Http404
from .models import Article


def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        raise Http404


def create_post(request):
    if not request.user.is_authenticated:  # правильная проверка в новых версиях Django
        return redirect('login')  # перенаправляем на страницу входа

    if request.method == "POST":
        # обработка отправленной формы
        form = {
            'title': request.POST.get('title', ''),
            'text': request.POST.get('text', '')
        }

        # проверка, что поля не пустые
        if form['title'] and form['text']:
            # проверка на уникальность заголовка
            if Article.objects.filter(title=form['title']).exists():
                form['errors'] = 'Статья с таким названием уже существует'
                return render(request, 'create_post.html', {'form': form})
            else:
                article = Article.objects.create(
                    title=form['title'],
                    text=form['text'],
                    author=request.user
                )
                return redirect('get_article', article_id=article.id)
        else:
            form['errors'] = 'Заполните все поля'
            return render(request, 'create_post.html', {'form': form})
    else:
        # просто показать пустую форму
        return render(request, 'create_post.html', {})


def register(request):
    if request.method == "POST":
        # получение данных из формы
        username = request.POST.get('username', '')
        email = request.POST.get('email', '')
        password = request.POST.get('password', '')
        password2 = request.POST.get('password2', '')

        # проверка на пустые поля
        if not (username and email and password and password2):
            return render(request, 'register.html', {'error': 'Заполните все поля'})

        # проверка совпадения паролей
        if password != password2:
            return render(request, 'register.html', {'error': 'Пароли не совпадают'})

        # проверка уникальности имени пользователя
        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {'error': 'Пользователь с таким именем уже существует'})

        # создание пользователя
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)  # автоматический вход после регистрации
        return redirect('archive')
    else:
        return render(request, 'register.html', {})


def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')

        if not (username and password):
            return render(request, 'login.html', {'error': 'Заполните все поля'})

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('archive')
        else:
            return render(request, 'login.html', {'error': 'Неверное имя пользователя или пароль'})
    else:
        return render(request, 'login.html', {})


def logout_view(request):
    logout(request)
    return redirect('archive')