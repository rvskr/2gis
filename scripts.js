window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY + window.innerHeight;
    var pageHeight = document.body.scrollHeight;

    // Проверяем, прокручена ли страница до конца
    if (scrollPosition >= pageHeight) {
        document.querySelector('footer').style.display = 'none';
    } else {
        document.querySelector('footer').style.display = 'block';
    }
});
