document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarrito();
  
    function actualizarCarrito() {
      const listaCarrito = document.getElementById('lista-carrito');
      listaCarrito.innerHTML = '';
      carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <span class="nombre-producto">${producto.nombre}</span>
          <span class="cantidad">
            <button class="reducir-cantidad">-</button>
            ${producto.cantidad}
            <button class="aumentar-cantidad">+</button>
          </span>
          <span class="precio">$${(producto.precio * producto.cantidad).toFixed(2)}</span>
          <button class="eliminar">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
      });
      document.getElementById('total-carrito').textContent = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
    }
  
    document.getElementById('lista-carrito').addEventListener('click', (e) => {
      const nombre = e.target.closest('li').querySelector('.nombre-producto').textContent;
      const index = carrito.findIndex(producto => producto.nombre === nombre);
  
      if (e.target.classList.contains('eliminar')) {
        carrito.splice(index, 1);
      } else if (e.target.classList.contains('aumentar-cantidad')) {
        carrito[index].cantidad++;
      } else if (e.target.classList.contains('reducir-cantidad')) {
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
        } else {
          carrito.splice(index, 1);
        }
      }
  
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    });
  });  