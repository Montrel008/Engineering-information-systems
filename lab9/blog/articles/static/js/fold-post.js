// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с классом fold-button
    var foldBtns = document.getElementsByClassName('fold-button');

    // Для каждой кнопки добавляем обработчик клика
    for (var i = 0; i < foldBtns.length; i++) {
        foldBtns[i].addEventListener('click', function(event) {
            var btn = event.target;

            // Находим родительский блок one-post
            var post = btn.closest('.one-post');

            // Находим внутри него блоки с информацией
            var author = post.querySelector('.article-author');
            var date = post.querySelector('.article-created-date');
            var text = post.querySelector('.article-text');

            // Проверяем, свернута ли уже статья
            if (btn.classList.contains('folded')) {
                // Разворачиваем
                btn.classList.remove('folded');
                btn.textContent = 'Свернуть';
                author.style.display = 'block';
                date.style.display = 'block';
                text.style.display = 'block';
            } else {
                // Сворачиваем
                btn.classList.add('folded');
                btn.textContent = 'Развернуть';
                author.style.display = 'none';
                date.style.display = 'none';
                text.style.display = 'none';
            }
        });
    }
});