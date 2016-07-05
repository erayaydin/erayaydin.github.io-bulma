// Window Scroll
var windowScroll = function () {
    $(window).scroll(function () {

        var scrollPos = $(this).scrollTop();

        if ($(window).scrollTop() > 70) {
            $('.site-header').addClass('site-header-nav-scrolled');
        } else {
            $('.site-header').removeClass('site-header-nav-scrolled');
        }
    });
};

// Enable bootstrap tooltip
$("body").tooltip({ selector: '[data-toggle=tooltip]' });

$('.geopattern').each(function(){
    $(this).geopattern($(this).data('pattern-id'));
});

$( document ).ready(function() {
    windowScroll();
});

$("#blog-categories li").css('text-transform','capitalize');