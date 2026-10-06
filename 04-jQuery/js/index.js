$(document).ready(function() {
    // 1. COLOCA A TUA CHAVE DA API AQUI DENTRO DAS ASPAS
    const apiKey = "8dae437f267b34d85a38e784e1191595"; 
    
    let lastFetchTime = null;

    // Função para calcular e mostrar o tempo passado desde a última atualização
    function updateWeatherTimeAgo() {
        if (!lastFetchTime) return;
        
        const now = new Date();
        const diffInSeconds = Math.floor((now - lastFetchTime) / 1000);

        let timeString = "";
        if (diffInSeconds < 60) {
            timeString = diffInSeconds + " seconds ago"; // em segundos no primeiro minuto
        } else if (diffInSeconds < 3600) {
            timeString = Math.floor(diffInSeconds / 60) + " minutes ago"; // em minutos até 1 hora
        } else {
            timeString = Math.floor(diffInSeconds / 3600) + " hours ago"; // em horas depois de 1 hora
        }
        
        $("#weather-time-ago").text(timeString);
    }

    // Atualiza a frase do "Last Update" a cada segundo
    setInterval(updateWeatherTimeAgo, 1000);

    // Função auxiliar para formatar a hora do nascer/pôr do sol (Ex: 7h46)
    function formatTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}h${minutes}`;
    }

    // Ação ao clicar no botão "Get"
    $("#btn-get-weather").click(function() {
        const city = $("#city-input").val().toLowerCase();
        
        if (!city) {
            alert("Por favor, introduz o nome de uma cidade.");
            return;
        }

        // Constrói o link exatamente como pedido na Worksheet
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

        // Faz o pedido à API usando jQuery
        $.ajax({
            url: url,
            method: "GET",
            success: function(data) {
                // Preenche os dados no HTML se tiver sucesso
                $("#weather-current").text(data.main.temp.toFixed(2) + " °C");
                $("#weather-max").text(data.main.temp_max.toFixed(2) + " °C");
                $("#weather-min").text(data.main.temp_min.toFixed(2) + " °C");
                $("#weather-humidity").text(data.main.humidity + "%");
                
                $("#weather-sunrise").text(formatTime(data.sys.sunrise));
                $("#weather-sunset").text(formatTime(data.sys.sunset));

                // Regista a hora da consulta e atualiza o texto de imediato
                lastFetchTime = new Date();
                updateWeatherTimeAgo();
            },
            error: function() {
                alert("Erro ao obter dados. Verifica se a cidade existe e se a tua API Key é válida.");
            }
        });
    });

    // Lógica para o cartão "Clock" (Relógio) funcionar
    setInterval(function() {
        const now = new Date();
        // Formata a hora para HH:MM:SS
        $("#clock-time").text(now.toLocaleTimeString('pt-PT'));
        // Formata a data para YYYY-MM-DD
        $("#clock-date").text(now.toISOString().split('T')[0]);
    }, 1000);
});