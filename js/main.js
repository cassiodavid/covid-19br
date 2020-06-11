var dados, estados_casos = [], estados_ordenado = [], casos_ordenado = [];

var estados_mortes = [], estados_ordenado_mortes = [], mortes_ordenadas = [];

var estados_suspeitas = [], estados_ordenados_suspeitas = [], suspeitas_ordenadas = [];

var estados_vivos = [], estados_ordenados_vivos = [], vivos_ordenados = [];

var recuperados, confirmados, ativos, obitos;



function carregaDados() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            for (let i = 0; i < result.data.length; i++) {
                estados_casos.push([result.data[i].uf, result.data[i].cases]);
            }

            for (let i = 0; i < result.data.length; i++) {
                estados_mortes.push([result.data[i].uf, result.data[i].deaths]);
            }

            for (let i = 0; i < result.data.length; i++) {
                estados_suspeitas.push([result.data[i].uf, result.data[i].suspects]);
            }

            for (let i = 0; i < result.data.length; i++) {
                estados_vivos.push([result.data[i].uf, result.data[i].refuses]);
            }

            estados_mortes.sort();
            estados_suspeitas.sort();
            estados_vivos.sort();
            estados_casos.sort();

            for (let i = 0; i < estados_casos.length; i++) {
                estados_ordenado.push(estados_casos[i][0]);
                casos_ordenado.push(estados_casos[i][1]);
            }

            for (let i = 0; i < estados_vivos.length; i++) {
                estados_ordenados_vivos.push(estados_vivos[i][0]);
                vivos_ordenados.push(estados_vivos[i][1]);
            }

            for (let i = 0; i < estados_suspeitas.length; i++) {
                estados_ordenados_suspeitas.push(estados_suspeitas[i][0]);
                suspeitas_ordenadas.push(estados_suspeitas[i][1]);
            }

            for (let i = 0; i < estados_mortes.length; i++) {
                estados_ordenado_mortes.push(estados_mortes[i][0]);
                mortes_ordenadas.push(estados_mortes[i][1]);
            }



        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1');
            console.error('ERRO: ', error);
        },
        async: false
    });
}

function carregaDadosGeralBr() {
    $.ajax({
        url: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil',
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            if (result.data.cases) {
                ativos = result.data.cases;
            }

            if (result.data.confirmed) {
                confirmados = result.data.confirmed;
            }

            if (result.data.recovered) {
                recuperados = result.data.recovered;
            }

            if (result.data.deaths) {
                obitos = result.data.deaths;
            }


        }, error: function (error) {
            console.error('ERRO AO CARREGAR DADOS EM https://covid19-brazil-api.now.sh/api/report/v1/brazil');
            console.error('ERRO: ', error);
        },
        async: false
    });
}


async function carregaGrafico() {
    console.log(ativos)
    var ctx = document.getElementById('canvas').getContext('2d');
    var config = {
        type: 'line',
        data: {
            labels: estados_ordenado,
            datasets: [{
                label: 'UF',
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
                text: 'CONFIRMADOS'
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

    window.onload = function () {
        window.myLine = new Chart(ctx, config);
    };
}



async function carregaGraficoSuspeitas() {
    var ctx = document.getElementById('canvasBarSuspeitas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: estados_ordenado,
            datasets: [{
                label: 'UF',
                data: suspeitas_ordenadas,
                backgroundColor: '#D2691E',
                borderColor: '#D2691E',
                fill: false

            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'CASOS SUSPEITOS'
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
    });
}



async function carregaGraficoBarMortes() {
    var ctx = document.getElementById('canvasBarMortes').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: estados_ordenado_mortes,
            datasets: [{
                label: 'UF',
                data: mortes_ordenadas,
                backgroundColor: '#800000',
                borderColor: '#800000',
                fill: false

            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'MORTES'
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

    });
}
