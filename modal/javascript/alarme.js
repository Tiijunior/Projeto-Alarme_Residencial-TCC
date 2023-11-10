var fade = document.getElementById('fade');
        var red = true; // Variável para alternar entre vermelho e preto
    
        // Função para alternar as cores
        function alternarCores() {
            if (red) {
                fade.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
            } else {
                fade.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            }
            red = !red; // Inverter o valor de red
        }
    
        // Configurar um temporizador para chamar a função a cada 1000 ms (1 segundo)
        setInterval(alternarCores, 100);