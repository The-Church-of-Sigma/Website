document.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var heroSection = document.querySelector('.hero-section');
    var backgroundPattern = document.querySelector('.background-pattern');

    // Parallax effect
    backgroundPattern.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';

    // Fade out effect
    var maxScroll = heroSection.clientHeight / 2;
    var opacity = 0.7 - (scrollPosition / maxScroll) * 0.7;
    backgroundPattern.style.opacity = Math.max(opacity, 0);
});
