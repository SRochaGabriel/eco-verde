// Acessando o modal por meio de querySelector com a classe 'modal'
const modal = document.querySelector('.modal');

// Acessando o botão de fechar o modal por meio do ID
const closeBtn = document.getElementById('close-btn');

// Acessando todas as imagens de ODS por meio do querySelectorAll, buscando todos os elementos img dentro da classe 'ods-display'
const odsButtons = document.querySelectorAll('.ods-display img');

// Irá armazenar as informações vindas do JSON
let odsData;

// Buscando as informações sobre cada ODS do arquivo JSON
fetch('/dados/ods.json', {method: 'GET'})
.then(res => res.json())
.then(data => odsData = data);


// Aqui, para cada botão armazenado em 'odsButtons', ouve por um evento de clique
odsButtons.forEach(odsBtn => {
    odsBtn.addEventListener('click', () => {
        // Definindo o título do card do modal com base no campo 'titulo' do objeto odsData com índice igual ao 'odsBtn.id' (id da imagem clicada)
        document.getElementById('modal-card-title').innerText = odsData[odsBtn.id].titulo;

        // Esvaziando a lista do body do card
        document.querySelector('.modal-card-body ul').innerHTML = '';

        // Para cada tópico no array 'topicos' do objeto 'odsData' no índice da imagem clicada
        for (const topico in odsData[odsBtn.id].topicos) {

            // A lista do body do card recebe um item list com o conteúdo do topico
            document.querySelector('.modal-card-body ul').innerHTML += `<li>${odsData[odsBtn.id].topicos[topico]}</li>`;
        }

        // Exibe o modal
        modal.style.display = 'block';
    });
});

// Caso o botão de fechar for clicado, fecha o modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');

// Caso o usuário clique fora do card do modal, fecha o modal
// Verifica os cliques na tela
window.addEventListener('click', e => {
    // Caso o elemento clicado seja o 'modal', ou seja, esteja fora da área do card
    if (e.target == modal) {
        // Fecha o modal
        modal.style.display = 'none';
    }
});