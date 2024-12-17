document.addEventListener("DOMContentLoaded", () => {
  const carrito = recuperarCarrito();
  actualizarCarrito();

  function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    limpiarContenedor(listaCarrito);

    carrito.forEach((producto) => {
      const productoElemento = crearElementoCarrito(producto);
      listaCarrito.appendChild(productoElemento);
    });

    actualizarTotal();
  }

  function limpiarContenedor(contenedor) {
    contenedor.innerHTML = "";
  }

  function crearElementoCarrito(producto) {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <span class="nombre-producto">${producto.nombre}</span>
      <span class="cantidad">
        <button class="reducir-cantidad">-</button>
        ${producto.cantidad}
        <button class="aumentar-cantidad">+</button>
      </span>
      <span class="precio">$${(producto.precio * producto.cantidad).toFixed(
        2
      )}</span>
      <button class="eliminar">Eliminar</button>
    `;
    return li;
  }

  function actualizarTotal() {
    const totalCarrito = carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    document.getElementById("total-carrito").textContent =
      totalCarrito.toFixed(2);
  }

  document.getElementById("lista-carrito").addEventListener("click", (e) => {
    manejarEventoCarrito(e);
  });

  function manejarEventoCarrito(event) {
    const productoElemento = event.target.closest("li");
    if (!productoElemento) return;

    const nombreProducto = obtenerNombreProducto(productoElemento);
    const productoIndex = carrito.findIndex(
      (producto) => producto.nombre === nombreProducto
    );

    if (event.target.classList.contains("eliminar")) {
      eliminarProducto(productoIndex);
    } else if (event.target.classList.contains("aumentar-cantidad")) {
      aumentarCantidad(productoIndex);
    } else if (event.target.classList.contains("reducir-cantidad")) {
      reducirCantidad(productoIndex);
    }

    guardarCarrito();
    actualizarCarrito();
  }

  function obtenerNombreProducto(productoElemento) {
    return productoElemento.querySelector(".nombre-producto").textContent;
  }

  function eliminarProducto(index) {
    carrito.splice(index, 1);
  }

  function aumentarCantidad(index) {
    carrito[index].cantidad++;
  }

  function reducirCantidad(index) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      eliminarProducto(index);
    }
  }

  const finalizarCompra = document.querySelector(".finalizar");
  if (finalizarCompra) {
    finalizarCompra.addEventListener("click", manejarFinalizarCompra);
  }

  function manejarFinalizarCompra() {
    if (carrito.length === 0) {
      alert(
        "Tu carrito está vacío. Agrega productos antes de finalizar la compra."
      );
      return;
    }
    window.location.href = "compra.html";
  }
});
