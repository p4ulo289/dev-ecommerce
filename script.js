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
