import {login} from "../API/API.js";

const formLogin = document.querySelector('#formLogin');

async function authUser(usuario){
    const datos = await login(usuario);

    console.log(datos.errors);
    if (datos.errors){
        alert(datos.errors[0].msg);
    } else {
        localStorage.setItem("userId", datos.usuario._id);
        localStorage.setItem("jwt", datos.token);
        window.location.href = "./home.html";
    }
}

function loginData(){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const usuario = {
        email,
        password
    }

    if (usuario.email == "" || usuario.password == ""){
        return alert("Todos los campos son obligatorios");
    } else {
        authUser(usuario);
    }
}

formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    loginData();
})