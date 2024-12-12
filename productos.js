// Obtengo contenido del archivo json y la convierto en un objeto
document.addEventListener("DOMContentLoaded", () => {
  fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
      const productos = data.productos;
      const productosContenedor = document.querySelector(
        ".productos-contenedor"
      ); // En productos-contenedor se van a mostrar los productos

      productosContenedor.innerHTML = "";

      productos.forEach((producto) => {
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
        productosContenedor.appendChild(div);
      }); // Creo un div con la clase producto, con la imagen, nombre, precio y boton para agregar al carrito

      document.querySelectorAll(".agregar-carrito").forEach((boton) => {
        boton.addEventListener("click", (e) => {
          e.preventDefault();
          const producto = e.target.closest(".producto");
          const nombre = producto.querySelector("h3").textContent;
          const precio = parseFloat(
            producto.querySelector(".precio").textContent.replace("$", "")
          );
          const imagen = producto.querySelector("img").src;
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
          const productoExistente = carrito.find(
            (item) => item.nombre === nombre
          );
          if (productoExistente) {
            productoExistente.cantidad++;
          } else {
            carrito.push({ nombre, precio, cantidad: 1, imagen });
          }
          localStorage.setItem("carrito", JSON.stringify(carrito));
          alert(`Producto ${nombre} agregado al carrito!`);
        });
      });
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
});
