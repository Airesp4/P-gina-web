document.addEventListener('DOMContentLoaded', function() {
    var scrollButtons = document.querySelectorAll('.rolarForm');

    scrollButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var forms = document.getElementById('formulario');
            forms.scrollIntoView({ behavior: 'smooth' });
        });
    });


    var form = document.getElementById('user-info-form');

    
    form.addEventListener('submit', function(event) {
        
        event.preventDefault();

        var weight = parseFloat(document.getElementById('weight').value);
        var height = parseFloat(document.getElementById('height').value);
        var age = parseInt(document.getElementById('age').value);

        
        var relatorio = gerarRelatorio(weight, height, age);

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(relatorio));
        element.setAttribute('download', 'relatorio.txt');
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });
});

function gerarRelatorio(weight, height, age) {

    var imc = weight / Math.pow(height, 2);
    var categoria = '';

    if (imc < 18.5) {
        categoria = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        categoria = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        categoria = 'Sobrepeso';
    } else {
        categoria = 'Obesidade';
    }

    var relatorio = `Relatório de Informações do Usuário\n\n`
                  + `Peso: ${weight} kg\n`
                  + `Altura: ${height} m\n`
                  + `Idade: ${age} anos\n`
                  + `IMC: ${imc.toFixed(2)}\n`
                  + `Categoria de IMC: ${categoria}`;

    return relatorio;
}
