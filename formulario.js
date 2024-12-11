document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const mensajeInput = document.getElementById("mensaje");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let errores = [];

    if (nombreInput.value.trim() === "") {
      errores.push("El campo de nombre es obligatorio.");
    } else if (nombreInput.value.trim().length < 3) {
      errores.push("El nombre debe tener al menos 3 caracteres.");
    }

    if (emailInput.value.trim() === "") {
      errores.push("El campo de correo es obligatorio.");
    } else if (!validarEmail(emailInput.value)) {
      errores.push("El formato del correo no es válido.");
    }

    if (mensajeInput.value.trim() === "") {
      errores.push("El campo de mensaje es obligatorio.");
    } else if (mensajeInput.value.trim().length < 10) {
      errores.push("El mensaje debe tener al menos 10 caracteres.");
    }

    if (errores.length > 0) {
      mostrarErrores(errores);
    } else {
      formulario.submit();
    }
  });

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function mostrarErrores(errores) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("errores");
    errorDiv.innerHTML = errores.map((error) => `<p>${error}</p>`).join("");

    const formularioParent = formulario.parentElement;
    const prevErrores = document.querySelector(".errores");
    if (prevErrores) {
      formularioParent.removeChild(prevErrores);
    }
    formularioParent.insertBefore(errorDiv, formulario);
  }
});