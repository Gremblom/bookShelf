import {login} from "../API/API.js";

const formLogin = document.querySelector('#formLogin');

async function authUser(usuario){
    const jwt = await login(usuario);

    localStorage.setItem("jwt", jwt);
    window.location.href = "./home.html";
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