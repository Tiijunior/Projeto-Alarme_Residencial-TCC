function relogio() {
    const relogio = document.getElementById('relogio');
    const relogio2 = document.getElementById('relogio_bloqueio');
    const data = new Date(); // Obtem a data e hora atuais do sistema
    const hora = data.getHours();  // armazena na variavel hora as horas
    const minutos = data.getMinutes(); // armazena na variavel minutos os minutos

    relogio.innerHTML = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    
    
    if(!(window.location.pathname).includes('bloqueio.html')) {
      if(!document.getElementById('home') && !document.getElementById('user')){
        if (navigator.onLine) {
          document.querySelector('.logo_wifi').innerHTML = '<img src="../../icons/wifi.svg" alt=""  style="margin-top: 5px;">';
        } else {
          document.querySelector('.logo_wifi').innerHTML = '<img src="../../icons/mdi_wifi-strength-off-outline.svg" alt="">';
        }
      }
      else{
        if (navigator.onLine) {
          document.querySelector('.logo_wifi').innerHTML = '<img src="../icons/wifi.svg" alt=""  style="margin-top: 5px;">';
        } else {
          document.querySelector('.logo_wifi').innerHTML = '<img src="../icons/mdi_wifi-strength-off-outline.svg" alt="">';
        }
      }
    }
}

setInterval(relogio, 1000); // Atualiza a cada 1 segundo (1000 milissegundos)
relogio(); // Chama a função para exibir o horário imediatamente
