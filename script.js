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
    var recomendacao = '';
    var reducao_025 = 0.10/100;
    var reducao_05 = 0.206/100;
    var reducao_1 = 7/100;

    if (imc < 18.5) {
        categoria = 'Abaixo do peso';
        recomendacao = 'O seu índice de massa corporal está abaixo do indicado, não sendo adequado o uso da medicação para perda de peso!';
    } else if (imc >= 18.5 && imc < 25) {
        categoria = 'Peso normal';
        recomendacao = 'Consulte um especialista para que possa averiguar a necessidade do tratamento!';
    } else if (imc >= 25 && imc < 30) {
        categoria = 'Sobrepeso';
        recomendacao =  'Abaixo consta um exemplo de como será administrado o medicamento,de acordo com os dados informados anteriormente.\n'+
                        'Consulte um especialista para a inicialização do tratamento!\n\n'+
                        'Inicialmente aplicando a dose de 0.25 mg por semana durante 4 semanas para análise de adaptação do organismo.\n'+
                        'Espera-se que essa dose resultará em uma redução de ' + (reducao_025 * weight) + ' Kg com base no seu peso inicial.\n\n'+
                        'Após 4 semanas aumentar a dose para 0.5mg por semana durante 4 semanas, resultando em uma redução de ' +
                        (reducao_05*weight).toFixed(2) + ' Kg.\n\n'+
                        'Para continuação do tratamento, é indicado para perda de peso ajustar a dosagem para 1mg por semana durante 17 meses \n'+
                        'que resultará em um redução total de ' + ((reducao_1 * weight) + (reducao_025 * weight) + (reducao_025)).toFixed(2) + " Kg ao final do período.\n\n"+
                        'Lembre-se que o medicamento só pode ser tomado com acompanhamento médico e prescrição, acompanhado de uma boa alimentação do paciente.';

    } else {
        categoria = 'Obesidade';
        recomendacao =  'Abaixo consta um exemplo de como será administrado o medicamento,de acordo com os dados informados anteriormente.\n'+
                        'Consulte um especialista para a inicialização do tratamento!\n\n'+
                        'Inicialmente aplicando a dose de 0.25 mg por semana durante 4 semanas para análise de adaptação do organismo.\n'+
                        'Espera-se que essa dose resultará em uma redução de ' + (reducao_025 * weight) + ' Kg com base no seu peso inicial.\n\n'+
                        'Após 4 semanas aumentar a dose para 0.5mg por semana durante 4 semanas, resultando em uma redução de ' +
                        (reducao_05*weight).toFixed(2) + ' Kg.\n\n'+
                        'Para continuação do tratamento, é indicado para perda de peso ajustar a dosagem para 1mg por semana durante 17 meses \n'+
                        'que resultará em um redução total de ' + ((reducao_1 * weight) + (reducao_025 * weight) + (reducao_025)).toFixed(2) + " Kg ao final do período.\n\n"+
                        'Lembre-se que o medicamento só pode ser tomado com acompanhamento médico e prescrição, acompanhado de uma boa alimentação do paciente.';

    }

    var relatorio = `Relatório de Informações do Usuário\n\n` +
                    `Peso: ${weight} kg\n` +
                    `Altura: ${height} m\n` +
                    `Idade: ${age} anos\n` +
                    `IMC: ${imc.toFixed(2)}\n` +
                    `Categoria de IMC: ${categoria}\n\n` +
                    `Recomendação: ${recomendacao}`;

    return relatorio;
}

