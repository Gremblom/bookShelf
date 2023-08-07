import {getLibro, postFavorito, postReseña, getReseñas} from "../API/API.js";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const libroId = getParameterByName("bookId");
const libroTitle = document.querySelector("#bookTitle");
const libroCardContainer = document.querySelector(".bookContainer");
const reseñaCardContainer = document.querySelector(".cardsContainer");
const postReseñaButton = document.querySelector("#myBtn");
const reseñaForm = document.querySelector("#reseñaForm")
const agregarFavoritoButton = document.querySelector("#makeFavorite");
const modal = document.querySelector("#myModal");
const span = document.querySelector(".close");
const userId = localStorage.getItem("userId");
const user = document.querySelector("#user");
const userFav = document.querySelector("#userFav");

user.innerHTML = `
<a  id="user" href="usuario.html?userId=${userId}"><img src="../img/profileDefault.png" alt="logoletter.png"></a>
`;
userFav.innerHTML = `<img src="../img/guardado.png" alt="guardado.png"><a href="usuario.html?userId=${userId}">Guardados</a>`;

async function showLibro(){
    const libro = await getLibro(libroId);

    const {autor, nombre, genero, sinopsis} = libro;
    libroTitle.innerHTML = nombre;

    libroCardContainer.innerHTML = `
    <div class="cardBody">
        <div class="cardLeftPart">
            <div class="bookImg">
                <img src="../img/bookportrait.jpg" alt="bookFrontCase">
            </div>
            <div class="bookGenre">
                <ul>
                    <li>${genero}</li>
                    <li>${autor}</li>
                </ul>
            </div>
        </div>
        <div class="cardRightPart">
            <div class="bookSummary">
                <h5>Sinopsis</h5>
                <p>${sinopsis}</p>
            </div>
        </div>
    </div>
    `;
}



async function favoritoData(){
    const favorito = {
        libro : libroId
    }

    const datos = await postFavorito(favorito);

    console.log(datos);

    if (!datos.register){
        alert(datos.msg)
    } else {
        alert("Agregado a tu lista de favoritos exitosamente");
    }
}

async function showReseñas(){
    reseñaCardContainer.innerHTML = "";

    const reseñas = await getReseñas("L", libroId);

    reseñas.forEach((reseña)=>{
        const {usuario, calificacion, comentario} = reseña;       

        reseñaCardContainer.innerHTML += `
        <div class="cardScroll">
            <div class="cardBody">
                <div class="cardLeftPart">
                    <div class="userProfile">
                        <img src="../img/profileDefault.png" alt="bookFrontCase">
                    </div>
                    <div class="userRating">
                        <p>${calificacion}<img src="../img/star.png" alt="star"></p>
                    </div>
                </div>
                <div class="cardRightPart">
                    <div class="username">
                        <h3>${usuario.usuario}</h3>
                    </div>
                    <div class="userInfo">
                        <p>${comentario}</p>
                    </div>
                </div>
            </div>
        </div>  
        `;
    })
}

function reseñaData(){
    const calificacion = document.querySelector('#calificacion').value;
    const comentario = document.querySelector('#comentario').value;

    const reseña = {
        calificacion,
        comentario
    }

    if (reseña.calificacion == "" || reseña.comentario == ""){
        alert("Todos los campos son obligatorios");
    } else {
        postReseña(reseña, libroId);
    }
}

function showModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

window.onclick = function(e){
    if (e.target == modal){
        modal.style.display = "none";
    }
}

reseñaForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    reseñaData();
})
postReseñaButton.addEventListener('click', showModal);
span.addEventListener('click', closeModal);
agregarFavoritoButton.addEventListener("click", favoritoData);
document.addEventListener('DOMContentLoaded', ()=>{
    showLibro();
    showReseñas();
});