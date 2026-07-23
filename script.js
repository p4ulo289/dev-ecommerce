//mostrando os produtos
import {products} from './Products/Itens.js'

const container = document.getElementById("products-container");

function renderProducts(productsList) {

    container.innerHTML = "";

products.forEach(product => {
    container.innerHTML += `
    <ul class="card">
        <img id="images" src ="${product.image}"> </img>
        <h2>${product.name}</h2>

        <p> R$ ${product.price}</p>

        <p> amount: ${product.amount} </p>

        <button onclick="addToCart(${product.id})"> 
        Adicionar
        </button>

    </ul>
    `;
})
};

renderProducts(products);

//------------------------------

//Criando Cart
export let cart =[];

//função para adicionar

// No final do script.js
function addToCart(id) {
    // Usamos 'item' em vez de 'products' para evitar erro de redeclaração
    const item = products.find(p => p.id === id);
    
    if (item) {
        cart.push(item);
        updateCartCount();
        saveCart();
        alert(`${item.name} adicionado ao carrinho!`);
    }
}

// ESSENCIAL: Torna a função visível para o botão onclick do HTML
window.addToCart = addToCart;

//Atualizando o contador

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerHTML = cart.length;
    }
}

//Salvando

function saveCart () {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

//Carregando 

function loadCart () {
    const cartStorage = 
        localStorage.getItem("cart")
    if (cartStorage) {
        cart = JSON.parse(cartStorage);

        updateCartCount();
    }    
}

loadCart();

//----------------------------------------

//Busca

const searchInput = 
    document.getElementById("search")

searchInput.addEventListener("input",() => {
    
    const value = 
        searchInput.value.toLowerCase();

        const filtered = products.filter(product =>

            product.name
            .toLocaleLowerCase()
            .includes(value)
        );

        renderProducts(filtered);
});

//-------------------------------

//Função para alterar quantidade 

function changeQuantity(index, change) {
    if (!cart[index].quantity) {
        cart[index].quantity = 1;
    }
    // Altera a quantidade com base no botão clicado (+1 ou -1)
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); 
}

window.changeQuantity = changeQuantity;


//inicio da funcao do rendercart

let total = 0;

cart.forEach((item) => {
    const qty = intem.quantity || 1;
    total+=item.price*qty
});

//-----------------------------