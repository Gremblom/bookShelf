import {register} from "../API/API.js";

const registerForm = document.querySelector('#registerForm');

async function authRegister(registro){
    const datos = await register(registro);

    if (datos.errors){
        datos.errors.forEach((error)=>{
            alert(`${error.msg}`);
        })
    }
}

function loadRegisterObject(){
    const usuario = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const registro = {
        usuario,
        email,
        password,
        rol : 'USER'
    }

    if (registro.usuario == "" || registro.email == "" || registro.password == ""){
        return alert("Todos los campos son obligatorios");
    } else {
        authRegister(registro);
    }
}

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    loadRegisterObject();
})