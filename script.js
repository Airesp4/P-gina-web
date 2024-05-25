document.addEventListener('DOMContentLoaded', function() {
    var scrollButton = document.getElementById('rolarForm');
    var forms = document.getElementById('formulario');

    scrollButton.addEventListener('click', function() {
        forms.scrollIntoView({ behavior: 'smooth' });
    });
});