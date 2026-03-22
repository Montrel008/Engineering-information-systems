$(document).ready(function() {
    // Эффект подсветки поста при наведении курсора
    $('.one-post').hover(
        function() {
            $(this).animate({ opacity: 0.7 }, 200);
        },
        function() {
            $(this).animate({ opacity: 1 }, 200);
        }
    );

    // Эффект для картинки-логотипа
    $('.header img').hover(
        function() {
            var currentWidth = $(this).width();
            $(this).animate({ width: currentWidth + 30 }, 200);
        },
        function() {
            var currentWidth = $(this).width();
            $(this).animate({ width: currentWidth - 30 }, 200);
        }
    );
});