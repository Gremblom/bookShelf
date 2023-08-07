import {verify} from "../API/API.js";

async function verifyUser(){
    const token = await verify();

    if (!token.validToken){
        window.location.href = "../index.html";
    } else {
        console.log("Usuario verificado exitosamente");
    }
}

document.addEventListener('DOMContentLoaded', verifyUser);