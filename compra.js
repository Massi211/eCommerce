document.addEventListener("DOMContentLoaded", () => {
  const numeroOperacion = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("numeroOperacion").textContent = numeroOperacion;
});