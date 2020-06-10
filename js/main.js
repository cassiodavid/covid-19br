var dados, estados_casos = [], estados_ordenado = [], casos_ordenado = [];

function carregaDados() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            for (let i = 0; i < result.data.length; i++) {
                estados_casos.push([result.data[i].uf, result.data[i].cases]);
            }
            estados_casos.sort();

            for (let i = 0; i < estados_casos.length; i++) {
                estados_ordenado.push(estados_casos[i][0]);
                casos_ordenado.push(estados_casos[i][1]);
            }

        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1');
            console.error('ERRO: ', error);
        },
        async: false
    });
}

async function carregaGrafico() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var config = {
        type: 'line',
        data: {
            labels: estados_ordenado,
            datasets: [{
                label: 'Casos por UF',
                backgroundColor: '#1C1C1C',
                borderColor: '#1C1C1C',
                data: casos_ordenado,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'COVID-19'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
    };

    window.onload = function() {
        window.myLine = new Chart(ctx, config);
    };
}