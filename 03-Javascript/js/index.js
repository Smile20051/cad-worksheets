var app = (function() {
    'use strict';

    // Função genérica para alternar estado das luzes/música (Alíneas a, c, d)
    function toggleDevice(btnId, iconId, classOff, classOn, colorOff, colorOn) {
        const btn = document.getElementById(btnId);
        const icon = document.getElementById(iconId);

        if (btn && icon) {
            btn.addEventListener('change', function() {
                if (this.checked) {
                    // Estado ON
                    icon.classList.remove(classOff, colorOff);
                    icon.classList.add(classOn, colorOn);
                } else {
                    // Estado OFF
                    icon.classList.remove(classOn, colorOn);
                    icon.classList.add(classOff, colorOff);
                }
            });
        }
    }

    // Configurar os botões (Alínea b)
    toggleDevice('btn-kitchen-lights', 'icon-kitchen-lights', 'fa-regular', 'fa-solid', 'text-dark', 'text-warning');
    toggleDevice('btn-living-ceiling', 'icon-living-ceiling', 'fa-regular', 'fa-solid', 'text-dark', 'text-warning');
    toggleDevice('btn-living-ambient', 'icon-living-ambient', 'fa-regular', 'fa-solid', 'text-dark', 'text-warning');
    toggleDevice('btn-living-music', 'icon-living-music', 'text-dark', 'text-primary', 'text-dark', 'text-primary'); // Ajustar cores da música conforme preferência

    // Função para atualizar temperaturas (Alínea e)
    function updateTemperatures() {
        const kitchenTemp = document.getElementById('kitchen-temp');
        const livingTemp = document.getElementById('living-temp');

        // Valor aleatório entre 10 e 30
        const getRandomTemp = () => (Math.random() * (30 - 10) + 10).toFixed(1);

        if (kitchenTemp) kitchenTemp.textContent = getRandomTemp() + ' °C';
        if (livingTemp) livingTemp.textContent = getRandomTemp() + ' °C';
    }

    // Função para atualizar data e hora (Alínea f)
    function updateClock() {
        const timeElement = document.getElementById('clock-time');
        const dateElement = document.getElementById('clock-date');
        
        const now = new Date();

        if (timeElement) {
            // Formatar horas, minutos e segundos (HH:MM:SS)
            timeElement.textContent = now.toLocaleTimeString('pt-PT');
        }

        if (dateElement) {
            // Formatar data (YYYY-MM-DD)
            dateElement.textContent = now.toISOString().split('T')[0];
        }
    }

    // Inicializar chamadas e definir os intervalos
    updateClock(); // Atualiza data/hora ao carregar a página
    updateTemperatures(); // Gera a primeira temperatura

    setInterval(updateClock, 1000); // Atualiza hora a cada segundo (1000ms)
    setInterval(updateTemperatures, 5000); // Atualiza temperatura a cada 5 segundos (5000ms)

})();