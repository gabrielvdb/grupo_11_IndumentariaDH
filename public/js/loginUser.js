window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    form.email.focus();
  
    form.addEventListener("submit", (submitEvent) => {
        
        let errors = [];
  
        let email = document.querySelector("#mail");
        let contrasena = document.querySelector("#pass");
  
       
  
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
  
  
  
  
  
  
  