document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const mensajeInput = document.getElementById("mensaje");

  formulario.addEventListener("submit", manejarEnvioFormulario);

  function manejarEnvioFormulario(event) {
    event.preventDefault();

    const errores = obtenerErrores();

    if (errores.length > 0) {
      mostrarErrores(errores);
    } else {
      formulario.submit();
    }
  }

  function obtenerErrores() {
    let errores = [];

    validarCampoNombre(nombreInput.value, errores);
    validarCampoEmail(emailInput.value, errores);
    validarCampoMensaje(mensajeInput.value, errores);

    return errores;
  }

  function validarCampoNombre(nombre, errores) {
    if (nombre.trim() === "") {
      errores.push("El campo de nombre es obligatorio.");
    } else if (nombre.trim().length < 3) {
      errores.push("El nombre debe tener al menos 3 caracteres.");
    }
  }

  function validarCampoEmail(email, errores) {
    if (email.trim() === "") {
      errores.push("El campo de correo es obligatorio.");
    } else if (!validarEmail(email)) {
      errores.push("El formato del correo no es válido.");
    }
  }

  function validarCampoMensaje(mensaje, errores) {
    if (mensaje.trim() === "") {
      errores.push("El campo de mensaje es obligatorio.");
    } else if (mensaje.trim().length < 10) {
      errores.push("El mensaje debe tener al menos 10 caracteres.");
    }
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function mostrarErrores(errores) {
    const errorDiv = crearElementoErrores(errores);
    insertarErroresEnFormulario(errorDiv);
  }

  function crearElementoErrores(errores) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("errores");
    errorDiv.innerHTML = errores.map((error) => `<p>${error}</p>`).join("");
    return errorDiv;
  }

  function insertarErroresEnFormulario(errorDiv) {
    const formularioParent = formulario.parentElement;
    const prevErrores = document.querySelector(".errores");
    if (prevErrores) {
      formularioParent.removeChild(prevErrores);
    }
    formularioParent.insertBefore(errorDiv, formulario);
  }
});
