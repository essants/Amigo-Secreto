let amigo = [];      // Lista de amigos disponíveis para sorteio
let sorteados = [];  // Lista dos amigos que já foram sorteados (opcional)
let primeiroSorteio = true; // Flag para ocultar a lista após o primeiro sorteio

function adicionarAmigo() {
    let input = document.getElementById('amigo');
    let nome = input.value.trim();

    if (nome !== '') {
        // Evita adicionar o mesmo nome mais de uma vez
        if (amigo.includes(nome) || sorteados.includes(nome)) {
            alert('Este nome já foi adicionado!');
            input.value = '';
            input.focus();
            return;
        }

        amigo.push(nome);
        console.log(`${nome} foi adicionado à lista de amigos!`);
        adicionarAmigosNaListaHTML();  // Atualiza a lista de amigos
        input.value = '';
        input.focus();
    } else {
        alert('Por favor, digite um nome válido!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('btnAdicionar');
    const inputAmigo = document.getElementById('amigo');
    const btnSortear = document.getElementById('btnSortear');
    const btnReiniciar = document.getElementById('btnReiniciar');

    btnAdicionar.addEventListener('click', adicionarAmigo);

    inputAmigo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            adicionarAmigo();
        }
    });

    btnSortear.addEventListener('click', sortearAmigo);

    btnReiniciar.addEventListener('click', reiniciarSorteio);
});

// Função que exibe a lista de amigos na interface
function adicionarAmigosNaListaHTML() {
    const lista = document.getElementById('listaAmigos');

    if (!lista) {
        console.error('Elemento "listaAmigos" não encontrado!');
        return;
    }

    lista.innerHTML = '';

    amigo.forEach(function(nome) {
        const item = document.createElement('li');
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Função que exibe a lista de sorteados na interface
function atualizarSorteadosNaListaHTML() {
    const listaSorteados = document.getElementById('listaSorteados');

    if (!listaSorteados) {
        console.error('Elemento "listaSorteados" não encontrado!');
        return;
    }

    listaSorteados.innerHTML = '';

    sorteados.forEach(function(nome) {
        const item = document.createElement('li');
        item.textContent = nome;
        listaSorteados.appendChild(item);
    });
}

// Função para sortear um amigo
function sortearAmigo() {
    if (amigo.length === 0) {
        alert('Não há amigos disponíveis para o sorteio!');
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigo.length);
    const amigoSorteado = amigo[indiceSorteado];

    const resultado = document.getElementById('resultado');
    if (!resultado) {
        console.error('Elemento "resultado" não encontrado!');
        return;
    }

    resultado.innerHTML = `O amigo sorteado é: <strong>${amigoSorteado}</strong>`;

    sorteados.push(amigoSorteado);
    amigo.splice(indiceSorteado, 1);

    adicionarAmigosNaListaHTML();      // Atualiza a lista (mesmo que oculta)
    atualizarSorteadosNaListaHTML();   // Atualiza os sorteados

    // Esconde a lista de amigos após o primeiro sorteio
    if (primeiroSorteio) {
        const lista = document.getElementById('listaAmigos');
        if (lista) {
            lista.style.display = 'none'; // Esconde a lista de amigos restantes
        }
        primeiroSorteio = false; // Impede que se repita
    }

    // Se acabou os amigos, mostra o botão de reinício
    if (amigo.length === 0) {
        const btnReiniciar = document.getElementById('btnReiniciar');
        if (btnReiniciar) {
            btnReiniciar.style.display = 'block';
        }
    }
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    amigo = amigo.concat(sorteados); // Junta os sorteados de volta
    sorteados = [];                  // Limpa os sorteados

    adicionarAmigosNaListaHTML();    // Atualiza a lista de amigos
    atualizarSorteadosNaListaHTML(); // Limpa a lista de sorteados

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    const lista = document.getElementById('listaAmigos');
    if (lista) {
        lista.style.display = 'block'; // Mostra novamente a lista de amigos
    }

    const btnReiniciar = document.getElementById('btnReiniciar');
    if (btnReiniciar) {
        btnReiniciar.style.display = 'none'; // Esconde o botão de reinício novamente
    }

    primeiroSorteio = true; // Reseta a flag
}