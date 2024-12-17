document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  function cargarProductos() {
    fetch("productos.json")
      .then((response) => response.json())
      .then((data) => {
        const productos = data.productos;
        mostrarProductos(productos);
        agregarEventosCarrito();
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }

  function mostrarProductos(productos) {
    const productosContenedor = obtenerProductosContenedor();
    limpiarContenedor(productosContenedor);

    productos.forEach((producto) => {
      const productoElemento = crearElementoProducto(producto);
      productosContenedor.appendChild(productoElemento);
    });
  }

  function obtenerProductosContenedor() {
    return document.querySelector(".productos-contenedor");
  }

  function limpiarContenedor(contenedor) {
    contenedor.innerHTML = "";
  }

  function crearElementoProducto(producto) {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-texto">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio}</p>
        <a href="#" class="agregar-carrito">Agregar al carrito</a>
      </div>
    `;
    return div;
  }

  function agregarEventosCarrito() {
    const botones = document.querySelectorAll(".agregar-carrito");
    botones.forEach((boton) =>
      boton.addEventListener("click", manejarAgregarCarrito)
    );
  }

  function manejarAgregarCarrito(event) {
    event.preventDefault();
    const productoElemento = obtenerProductoElemento(event.target);
    const producto = extraerInformacionProducto(productoElemento);
    agregarProductoAlCarrito(producto);
    alert(`Producto ${producto.nombre} agregado al carrito!`);
  }

  function obtenerProductoElemento(boton) {
    return boton.closest(".producto");
  }

  function extraerInformacionProducto(productoElemento) {
    const nombre = productoElemento.querySelector("h3").textContent;
    const precio = parseFloat(
      productoElemento.querySelector(".precio").textContent.replace("$", "")
    );
    const imagen = productoElemento.querySelector("img").src;
    return { nombre, precio, imagen };
  }

  function agregarProductoAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(
      (item) => item.nombre === producto.nombre
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
  }

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});