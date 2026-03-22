$(document).ready(function() {
    var $layers = $('.parallax-layer');

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();

        $layers.each(function(index) {
            // Движение вверх при прокрутке вниз (обратный параллакс)
            var speed = 0.05 * (index + 1);
            var yPosition = -scrolled * speed;
            $(this).css({ transform: 'translateY(' + yPosition + 'px)' });
        });
    });
});