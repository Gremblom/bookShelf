import {getCreyentes, getCreyente, nuevoCreyente, borrarCreyente, getMinisterioHombre, getRutaEnviados, getAdultos, getFormacionAncianos} from "./API.js";

const cardsContainer = document.querySelector('#cartas');
const form = document.querySelector('#formPOST');
const allCreyentes = document.querySelector('#getTodos')
const ministerioHombres = document.querySelector('#getMinisterio');
const rutaEnviados = document.querySelector('#getRuta');
const adultos = document.querySelector('#getAdultos');
const formacionAncianos = document.querySelector('#getFormacion')

async function showCreyentes(){
    cardsContainer.innerHTML = "";
    const creyentes = await getCreyentes();
    creyentes.forEach((creyente)=>{
        const {_id, nombre, edad, ministerio, nivelFormacion, nivelRuta} = creyente;
        cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${edad}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary">${ministerio}</h6>
                <p class="card-text">${nivelFormacion}</p>
                <p class="card-text">${nivelRuta}</p>
                <a href="#" id="${_id}" class="card-link btn btn-danger eliminar">Eliminar</a>
            </div>
        </div>
        `;
    })
}

async function showMinisterioHombres(){
    cardsContainer.innerHTML = "";
    const adultos = await getMinisterioHombre();
    adultos.forEach((adulto)=>{
        const {_id, nombre, edad, ministerio, nivelFormacion, nivelRuta} = adulto;
        cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${edad}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary">${ministerio}</h6>
                <p class="card-text">${nivelFormacion}</p>
                <p class="card-text">${nivelRuta}</p>
                <a href="#" id="${_id}" class="card-link btn btn-danger eliminar">Eliminar</a>
            </div>
        </div>
        `;
    })
}

async function showRutaEnviados(){
    cardsContainer.innerHTML = "";
    const enviados = await getRutaEnviados();
    enviados.forEach((enviado)=>{
        const {_id, nombre, edad, ministerio, nivelFormacion, nivelRuta} = enviado;
        cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${edad}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary">${ministerio}</h6>
                <p class="card-text">${nivelFormacion}</p>
                <p class="card-text">${nivelRuta}</p>
                <a href="#" id="${_id}" class="card-link btn btn-danger eliminar">Eliminar</a>
            </div>
        </div>
        `;
    })
}

async function showAdultos(){
    cardsContainer.innerHTML = "";
    const adultos = await getAdultos();
    adultos.forEach((adulto)=>{
        const {_id, nombre, edad, ministerio, nivelFormacion, nivelRuta} = adulto;
        cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${edad}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary">${ministerio}</h6>
                <p class="card-text">${nivelFormacion}</p>
                <p class="card-text">${nivelRuta}</p>
                <a href="#" id="${_id}" class="card-link btn btn-danger eliminar">Eliminar</a>
            </div>
        </div>
        `;
    })
}

async function showFormacionAncianos(){
    cardsContainer.innerHTML = "";
    const ancianos = await getFormacionAncianos();
    ancianos.forEach((anciano)=>{
        const {_id, nombre, edad, ministerio, nivelFormacion, nivelRuta} = anciano;
        cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${edad}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary">${ministerio}</h6>
                <p class="card-text">${nivelFormacion}</p>
                <p class="card-text">${nivelRuta}</p>
                <a href="#" id="${_id}" class="card-link btn btn-danger eliminar">Eliminar</a>
            </div>
        </div>
        `;
    })
}

async function newCreyente(e){
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const edad = document.querySelector('#edad').value;
    const ministerio = document.querySelector('#ministerio').value;
    const nivelFormacion = document.querySelector('#formacion').value;
    const nivelRuta = document.querySelector('#ruta').value;
    const genero = document.querySelector('#genero').value;

    const creyente = {
        nombre,
        edad,
        ministerio,
        nivelFormacion,
        nivelRuta,
        genero
    }

    if (creyente.nombre == "" || creyente.ministerio == "" || creyente.nivelFormacion == "" || creyente.nivelRuta == "" || creyente.genero == ""){
        alert("Todos los campos son obligatorios");
    } else {
        nuevoCreyente(creyente);
    }
}

cardsContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('eliminar')){
        const id = e.target.getAttribute('id');
        borrarCreyente(id);
    }
})

form.addEventListener('submit', newCreyente);
allCreyentes.addEventListener('click', showCreyentes);
ministerioHombres.addEventListener('click', showMinisterioHombres);
rutaEnviados.addEventListener('click', showRutaEnviados);
adultos.addEventListener('click', showAdultos);
formacionAncianos.addEventListener('click', showFormacionAncianos);

document.addEventListener('DOMContentLoaded', showCreyentes);