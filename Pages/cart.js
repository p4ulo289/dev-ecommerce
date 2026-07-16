import { products } from "../Products/Itens.js"; // Adicionado .js

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");
const totalElement = document.getElementById("total"); // Pegando o elemento do total

let total = 0;

container.innerHTML = ""; // Limpa o container antes de renderizar

cart.forEach(item => {
    total += item.price;

    container.innerHTML += `
    <div class="cart-item">
        <img src="${item.image}" alt="${item.name}"class="cart-img">
        <div class="cart-info">
            <h3>${item.name}</h3>
            <p>R$ ${item.price}</p>
            <button onclick="removeItem(${item.id})" class="btn-remove">Excluir</button>
        </div>    
    </div>
    `;
});

// Corrigido para garantir que o elemento existe antes de escrever
if (totalElement) {
    totalElement.innerHTML = `Total R$ ${total}`;
}

//função para excluir os itens

function removeItem(id) {
    // 1. Filtra o carrinho: cria um novo array sem o item do ID selecionado
    // Usamos o filter para remover apenas a primeira ocorrência ou todas com esse ID
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1); // Remove 1 item na posição encontrada
    }

    // 2. Salva a lista atualizada no LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 3. Recarrega a página ou chama a função de renderizar novamente
    location.reload(); 
}

//----------------------------

function esvaziar() {
    if (confirm("Deseja realmente esvaziar o seu carrinho?")) {
        
        localStorage.setItem("cart", JSON.stringify([]));

        location.reload();
    }
}

window.esvaziar = esvaziar;

// Torna a função global para o botão conseguir usá-la

window.removeItem = removeItem