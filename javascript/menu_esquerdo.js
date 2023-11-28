var ja_carregado = false;

function carregar_comodos() {
    if(ja_carregado == false) {
        for(let i = 0; i < quantidade_comodo; i++) {
                
            var tipo_comodo = (lista_comodo[i][3]);
            tipo_comodo = (tipo_comodo.replace(/ /g, '')).charAt(0).toUpperCase() + tipo_comodo.slice(2);
            criarComodo(tipo_comodo, lista_comodo[i][2], lista_comodo[i][0]);
            
            var status_comodo = document.getElementById('ativar_comodo' + lista_comodo[i][0]);
            if(lista_comodo[i][5] == ' 1'){            
                status_comodo.style.width = '50px';
                status_comodo.style.height = '28px';
                status_comodo.style.marginTop = '19px';
                status_comodo.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
                status_comodo.style.backgroundRepeat = 'no-repeat';
                status_comodo.style.backgroundSize = 'cover';
                
            } else {
                status_comodo.style.width = '48px';
                status_comodo.style.height = '24px';
                status_comodo.style.marginTop = '21px';
                status_comodo.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
                status_comodo.style.backgroundRepeat = 'no-repeat';
                status_comodo.style.backgroundSize = 'cover';
                
            }
        }
        ja_carregado = true;
    }
}
function criarComodo(imagem, nome, idcomodo) {
    
    let listaComodos = document.getElementById('lista_comodos');

    for (let i = 1; i < 2; i++) {
        let bloco = document.createElement('div');
        bloco.id = 'bloco' + idcomodo;
        bloco.className = 'bloco_comodo';
        bloco.style.top = (comodo - 1)  + 'px';

        let div = document.createElement('div');
        div.id = 'bloco' + comodo;
        div.className = 'bloco_fundo';
        div.setAttribute('onclick', 'local(this.id)');
        bloco.appendChild(div);
        
        let img = document.createElement('img');
        img.id = 'img_comodo' + comodo;
        img.className = 'img_comodos';
        img.src = '../icons/' + imagem + '.svg';
        img.alt = '';
        bloco.appendChild(img);

        let ativar = document.createElement('div');
        ativar.id = 'ativar_comodo' + idcomodo;
        ativar.className = 'ativar_comodos';
        ativar.setAttribute('onclick', 'ativar_comodo(this.id)');
        bloco.appendChild(ativar);

        let texto = document.createElement('p');
        texto.id = 'texto_comodo' + comodo;
        texto.className = 'texto_comodos';
        texto.textContent = nome;
        bloco.appendChild(texto);

        listaComodos.appendChild(bloco);
    }
    comodo++;
};


function ativar_comodo(elemento){
    var status_comodo = document.getElementById(elemento);
    var ativar;
    if(!status_comodo.style.background.includes('switch-on')) {
        status_comodo.style.width = '50px';
        status_comodo.style.height = '28px';
        status_comodo.style.marginTop = '19px';
        status_comodo.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        status_comodo.style.backgroundRepeat = 'no-repeat';
        status_comodo.style.backgroundSize = 'cover';
        ativar = 1
        
        ativar_bloco_comodo(elemento, ativar);
    } else {
        status_comodo.style.width = '48px';
        status_comodo.style.height = '24px';
        status_comodo.style.marginTop = '21px';
        status_comodo.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        status_comodo.style.backgroundRepeat = 'no-repeat';
        status_comodo.style.backgroundSize = 'cover';        
        ativar = 0
        ativar_bloco_comodo(elemento, ativar);
    }
};




function todos_comodos(elemento) {
    var botao = document.getElementById('switch_comodo');
    
    if(botao.style.background.includes('switch-on') && elemento === undefined) {
        botao.style.width = '48px';
        botao.style.height = '24px';
        botao.style.marginTop = '130px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';

        for(var i = 1; i <= comodo; i++) {
            if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-on')) {
                ativar_comodo('ativar_comodo' + i);
            };
        };

    } else if(elemento === 'ativar') {
        botao.style.width = '50px';
        botao.style.height = '28px';
        botao.style.marginTop = '128px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
    } else if(elemento === 'desativar') {
        botao.style.width = '48px';
        botao.style.height = '24px';
        botao.style.marginTop = '130px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
    } else {
        botao.style.width = '50px';
        botao.style.height = '28px';
        botao.style.marginTop = '128px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
        for(var i = 1; i < comodo; i++) {
            if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-desativado-off.svg')) {
                ativar_comodo('ativar_comodo' + i);
            }
        };        
    }
};






    

    /*for(var i = 1; i < comodo; i++) {
        if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-on.svg')) {
            status_todos++;
        } else {
            status_todos = 0;
        }
    };
    
    if(status_todos === (comodo - 1)){
        todos_comodos('ativar');
    } else if (status_todos === 0) {
        todos_comodos('desativar');
    }

    if(lista_comodo[i][5] == ' 1'){
            ativar_comodo(('ativar_comodo' + lista_comodo[i][0]));
        } else {
            ativar_comodo(('ativar_comodo' + lista_comodo[i][0]));
            ativar_comodo(('ativar_comodo' + lista_comodo[i][0]));
        }
    */