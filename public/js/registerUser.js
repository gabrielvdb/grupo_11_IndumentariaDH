window.addEventListener("load", () => {

  let form = document.querySelector(".form");
  form.nombre.focus();

  form.addEventListener("submit", (submitEvent) => {
      
      let errors = [];

      let nombre = document.querySelector("#firstname");
      let apellido = document.querySelector("#lastname");
      let fechaNacimiento = document.querySelector("#fechaNacimiento");
      let email = document.querySelector("#mail");
      let contrasena = document.querySelector("#pass");
      let categoria = document.querySelector("#categoria");
      let userImage = document.querySelector("#categoria");

      // --------- NAME ------------
    if (nombre.value === "") {
      errors.push("El campo nombre no puede estar vacío");
      nombre.classList.remove("is-valid");
      nombre.classList.add("is-invalid");
    } else if (nombre.value.length < 2) {
      errors.push("El campo nombre debe tener al menos 2 caracteres");
      nombre.classList.remove("is-valid");
      nombre.classList.add("is-invalid");
    } else {
      nombre.classList.add("is-valid");
      nombre.classList.remove("is-invalid");
      apellido.focus();
    }

       // --------- LASTNAME ------------
       if (apellido.value === "") {
        errors.push("El campo apellido no puede estar vacío");
        apellido.classList.remove("is-valid");
        apellido.classList.add("is-invalid");
      } else if (apellido.value.length < 2) {
        errors.push("El campo apellido debe tener al menos 2 caracteres");
        apellido.classList.remove("is-valid");
        apellido.classList.add("is-invalid");
      } else {
        apellido.classList.add("is-valid");
        apellido.classList.remove("is-invalid");
        fechaNacimiento.focus();
      }

     // --------- FECHA NACIMIENTO ------------
     if (fechaNacimiento.value == "") {
      errors.push("El campo fecha de nacimiento no puede estar vacío");
      fechaNacimiento.classList.remove("is-valid");
      fechaNacimiento.classList.add("is-invalid");
    } else {
      fechaNacimiento.classList.add("is-valid");
      fechaNacimiento.classList.remove("is-invalid");
      form.email.focus();
    };

      // --------- EMAIL ------------
    let regEmail = /\S+@\S+\.\S+/;
    if (email.value === "") {
      errors.push("El campo email es obligatorio");
      email.classList.add("is-invalid");
    } else if (!regEmail.test(email.value)) {
      errors.push("Debe ingresar un email válido");
      email.classList.add("is-invalid");
    } else if (existingUser.includes(email.value)) {
      errors.push("El email ingresado ya está registrado");
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid");
    }
      
      // --------- PASSWORD ------------

      let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (contrasena.value === "") {
        errors.push("El campo contraseña es obligatorio");
        contrasena.classList.add("is-invalid");
      } else if (contrasena.value.length < 8) {
        errors.push("El campo contraseña debe tener al menos 8 caracteres");
        contrasena.classList.add("is-invalid");
      } else if (!regPassword.test(contrasena.value)) {
        errors.push(
          "El campo contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial"
        );
        contrasena.classList.add("is-invalid");
      } else {
        contrasena.classList.remove("is-invalid");
      }

      // --------- CATEGORIA ------------
      if (categoria.value == "") {
        errors.push("El campo categoria no puede estar vacío");
        categoria.classList.remove("is-valid");
        categoria.classList.add("is-invalid");
    } else {
        categoria.classList.add("is-valid");
        categoria.classList.remove("is-invalid");
    };

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
            
      // Controlamos si hay errores 
      console.log(errors)
      if (errors.length > 0) {
         
          submitEvent.preventDefault();
          let ulErrors = document.querySelector(".errores");
          ulErrors.classList.add("alert-warning");
          ulErrors.innerHTML = "";
          for (let i = 0; i < errors.length; i++) {
              ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
          };
      } else {
          alert("La validación fue exitosa")
          form.submit();
      }
  });
})






