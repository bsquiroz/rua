//Arreglo de productos
const arrayProducts = [
    {
        id: 1,
        name: "Taladro",
        description: "Es un taladro",
    },
    {
        id: 2,
        name: "Pulidora",
        description: "Es una pulidora",
    },
    {
        id: 3,
        name: "Martillo",
        description: "Es un martillo",
    },
    {
        id: 4,
        name: "Destornillador",
        description: "Es un destornillador",
    },
    {
        id: 5,
        name: "Machete",
        description: "Es un machete",
    },
];

const $number_product = document.querySelector("#number_product");

//Arreglo del carrito de compras
let arrayShoppingCar = [];

//Variable que contiene el id donde van los productos junto con su variable
//html que se encarga de llenar el contenedor mediante el js
const $PRODUCTS = document.querySelector("#products");
let html_products = "";

//Variable que se encarga de llenar el contenedor del carrito y tambien su variable
//html

const $SHOPPINGCAR = document.querySelector("#shoppingCar");
let html_shopping_car = "";

arrayProducts.forEach((product) => {
    html_products += `
        <div class="products__box">
            <div class="products__info">
                <b>${product.name}</b>
                <p>${product.description}</p>
            </div>
            <div class="products__actions">
                <button onclick="addCar(${product.id})">Añadir al carrito</button>
            </div>
        </div>
    `;
});

$PRODUCTS.innerHTML = html_products;

function addCar(id) {
    const [auxProduct] = arrayProducts.filter((product) => product.id === id);

    if (auxProduct.hasOwnProperty("cantidad")) {
        auxProduct.cantidad = auxProduct.cantidad + 1;
    } else {
        auxProduct.cantidad = 1;
    }

    arrayShoppingCar = [...arrayShoppingCar, auxProduct];
    const auxShoppingCar = [];
    arrayShoppingCar.forEach((e) => {
        if (!auxShoppingCar.includes(e)) {
            auxShoppingCar.push(e);
        }
    });
    arrayShoppingCar = auxShoppingCar;
    html_shopping_car = holaquehace(arrayShoppingCar);

    $SHOPPINGCAR.innerHTML = html_shopping_car;
    html_shopping_car = "";

    $number_product.textContent = arrayShoppingCar.length;
}

function delCar(id) {
    const [product] = arrayShoppingCar.filter((product) => product.id === id);

    if (product.cantidad === 1) {
        arrayShoppingCar = arrayShoppingCar.filter((e) => e.id !== id);
        html_shopping_car = holaquehace(arrayShoppingCar);
    } else {
        product.cantidad = product.cantidad - 1;
        arrayShoppingCar = arrayShoppingCar.map((e) =>
            e.id === id ? product : e
        );
        html_shopping_car = holaquehace(arrayShoppingCar);
    }

    $SHOPPINGCAR.innerHTML = html_shopping_car;
    html_shopping_car = "";
    $number_product.textContent = arrayShoppingCar.length;
}

function holaquehace(array) {
    let html = "";
    array.forEach((product) => {
        html += `
            <div class="products__box">
                <div class="products__info">
                    <b>${product.name} - cantidad: ${product.cantidad}</b>
                    <p>${product.description}</p>
                </div>
                <div class="products__actions">
                    <button onclick="delCar(${product.id})">Eliminar del carro</button>
                </div>
            </div>
        `;
    });
    return html;
}
