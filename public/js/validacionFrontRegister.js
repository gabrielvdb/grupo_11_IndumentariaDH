windows.addEventListener('load',function(){

  let form= document.querySelector('#userRegisterForm')

  /*traemos el formulario*/
  form.addEventListener('submit',function(e){
    
    /*almacemanos errores*/
   let errores = [];

    /*nombre*/
    let nombre= document.querySelector('#nombre')[0].value;//Valores de entrada
    nombre.addEventListener('focus',function(){
      if (nombre == ''){
        errores.push('El nombre es obligatorio')
      }else if (nombre.lenght < 2){
        errores.push('El nombre tiene minimo dos caracteres')
      }
    })

    /*email. ver el else if, hacer validacion de email*/
    let email= document.querySelector('#email')
    email.addEventListener('focus',function(){
      if (email == ''){
        alert('El email es obligatorio')
      }else if (email.lenght < 2){
        alert('El email no es valido')
      }
    })
 
    /*contrasena. Agregar validacion de caracteres y letras extra*/
    let password= document.querySelector('#contrasena')
    password.addEventListener('focus',function(){
      if (password == ''){
        alert('La contrasena es obligatorio')
      }else if (password.lenght < 8){
        alert('La contrasena tiene minimo 8 caracteres')
      }
    })

    /* Ver validacion de imagenes*/
    let img= document.querySelector('#img') 
    img.addEventListener('focus',function(){
      if (img == ''){
        alert('Seleccione archivo')
      }else if (img.lenght < 8){
        alert('La contrasena tiene minimo 8 caracteres')
      }

      /* No envia formulario si hay errores*/
      if(errores.lenght>0){
        e.preventDefault()
        let ulErrores = document.querySelector('div.errores ul');
        for (let i = 0; i < errores.length; i++){
          ulErrores.innerHTML += '<li>' + errores[i] + '</li>'
        }
      }
    })
    
  })






})