const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = [
    { id: "landing-page", titulo: "Landing Page", precio: 1450, img: "./img/landing.png" },
    { id: "web-estatica", titulo: "Static Web", precio: 750, img: "./img/estatica.webp" },
    { id: "responsive-page", titulo: "Responsive Page", precio: 3000, img: "./img/responsive.jpg" },
    { id: "e-commerce", titulo: "E-commerce", precio: 11000, img: "./img/ecommerce.png" },
    { id: "app-web", titulo: "App Web", precio: 8000, img: "./img/appweb.jpg" },
];

const cargarProductos = () => {
    const contenedorProductos = document.querySelector("#productos");
    contenedorProductos.innerHTML = productos.map(producto => `
        <div class="producto">
            <img class="producto-img" src="${producto.img}">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <button class="producto-btn" onclick="agregarAlCarrito('${producto.id}')">Agregar al carrito</button>
        </div>
    `).join('');
}
cargarProductos();

const actualizarCarrito = () => {
    const carritoVacio = document.querySelector("#carrito-vacio");
    const carritoProductos = document.querySelector("#carrito-productos");
    const vaciar = document.querySelector("#vaciar");

    carritoVacio.classList.toggle("d-none", carrito.length !== 0);
    carritoProductos.innerHTML = carrito.map(producto => `
        <div class="carrito-producto">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <p>Cant: ${producto.cantidad}</p>
            <button class="carrito-producto-btn" onclick="disminuirCantidad('${producto.id}')">–</button>
            <button class="carrito-producto-btn" onclick="aumentarCantidad('${producto.id}')">⁺</button>
        </div>
    `).join('');

    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    document.querySelector("#carrito-total").innerText = `$${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const modificarCantidad = (id, cantidad) => {
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += cantidad;
    if (producto.cantidad <= 0) carrito.splice(carrito.indexOf(producto), 1);
    actualizarCarrito();
}

const agregarAlCarrito = (id) => {
    const producto = productos.find(item => item.id === id);
    const carritoProducto = carrito.find(item => item.id === id);
    if (carritoProducto) modificarCantidad(id, 1);
    else carrito.push({ ...producto, cantidad: 1 });
    actualizarCarrito();
}


const vaciarCarrito = () => {
    carrito.length = 0;
    actualizarCarrito();
}

document.querySelector("#vaciar").addEventListener("click", vaciarCarrito);

actualizarCarrito();

const disminuirCantidad = (id) => {
    modificarCantidad(id, -1);
}

const aumentarCantidad = (id) => {
    modificarCantidad(id, 1);
}

//Logout y Index

const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})