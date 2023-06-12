document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.querySelector("select[name='category']");
  const nuevaCategoriaContainer = document.getElementById("nuevaCategoriaContainer");
  const colorSelect = document.querySelector("select[name='color']");
  const nuevoColorContainer = document.getElementById("nuevoColorContainer");
  const precioAntesInput = document.getElementById("precioAntes");
  const discountInput = document.getElementById("discount");
  const precioAhoraInput = document.getElementById("precioAhora");

  precioAntesInput.addEventListener("input", function () {
    calcularPrecioAhora();
  });

  discountInput.addEventListener("input", function () {
    calcularPrecioAhora();
  });

  function calcularPrecioAhora() {
    const precioAntes = parseFloat(precioAntesInput.value);
    const discount = parseFloat(discountInput.value);
    const precioAhora = precioAntes - (precioAntes * (discount / 100));

    if (!isNaN(precioAhora)) {
      precioAhoraInput.value = precioAhora.toFixed(2);
    }
  }

  categorySelect.addEventListener("change", function () {
    if (categorySelect.value === "nueva") {
      nuevaCategoriaContainer.style.display = "block";
    } else {
      nuevaCategoriaContainer.style.display = "none";
    }
  });

  colorSelect.addEventListener("change", function () {
    if (colorSelect.value === "nuevo") {
      nuevoColorContainer.style.display = "block";
    } else {
      nuevoColorContainer.style.display = "none";
    }
  });

  let form = document.querySelector(".form");
  form.addEventListener("submit", (submitEvent) => {
        
    let errors = [];

    let nombre = document.querySelector("#nombre");
    let descripcion = document.querySelector("#descripcion");
    let userImage = document.querySelector("#userImage");

    // --------- NAME ------------
  if (nombre.value === "") {
    errors.push("El campo nombre no puede estar vacío");
    nombre.classList.remove("is-valid");
    nombre.classList.add("is-invalid");
  } else if (nombre.value.length < 5) {
    errors.push("El campo nombre debe tener al menos 5 caracteres");
    nombre.classList.remove("is-valid");
    nombre.classList.add("is-invalid");
  } else {
    nombre.classList.add("is-valid");
    nombre.classList.remove("is-invalid");
  }

     // --------- DESCRIPCION ------------
     if (descripcion.value === "") {
      errors.push("El campo descripcion no puede estar vacío");
      descripcion.classList.remove("is-valid");
      descripcion.classList.add("is-invalid");
    } else if (descripcion.value.length < 20) {
      errors.push("El campo descripcion debe tener al menos 20 caracteres");
      descripcion.classList.remove("is-valid");
      descripcion.classList.add("is-invalid");
    } else {
      descripcion.classList.add("is-valid");
      descripcion.classList.remove("is-invalid");
    }

  // --------- USER IMAGE ------------
if (userImage.value === '') {
  userImage.style.border = '2px solid rgba(245, 134, 134, 0.76)';
  errors.userImage = 'El campo imagen no puede estar vacío';
} else {
  // Validar la extensión de archivo permitida
  let allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.JPG'];
  let fileExtension = userImage.value.substring(userImage.value.lastIndexOf('.')).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    userImage.style.border = '2px solid rgba(245, 134, 134, 0.76)';
    errors.userImage = 'La extensión del archivo no es válida. Solo se permiten archivos JPG, JPEG, PNG y GIF.';
  } 
}

if (errors.length > 0) {
           
  submitEvent.preventDefault();
  let ulErrors = document.querySelector(".errores");
  ulErrors.classList.add("alert-warning");
  ulErrors.innerHTML = "";
  for (let i = 0; i < errors.length; i++) {
      ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
  };
} else {
  /* alert("La validación fue exitosa") */
  form.submit();
}
  });
});
