import {getFavoritos, getReseñas, getUsuario, getFriendship, deleteFriendship, deleteFavorito} from "../API/API.js";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const userId = getParameterByName("userId");
const localId = localStorage.getItem("userId");
const user = document.querySelector("#user");
const userFav = document.querySelector("#userFav");
const favContainer = document.querySelector("#favCards");
const infoContainer = document.querySelector("#userCards");
const userHomeButton = document.querySelector("#userHome");
const userFriendsButton = document.querySelector("#userFriends");
const username = document.querySelector("#name");
const logOut = document.querySelector("#logOut");

user.innerHTML = `
<a  id="user" href="usuario.html?userId=${localId}"><img src="../img/profileDefault.png" alt="logoletter.png"></a>
`;
userFav.innerHTML = `<img src="../img/guardado.png" alt="guardado.png"><a href="usuario.html?userId=${localId}">Guardados</a>`;

async function getUserInfo(){
    const usuario = await getUsuario(userId);

    username.innerHTML = usuario.usuario;
}

async function showFavoritos(){
    favContainer.innerHTML = "";
    const favoritos = await getFavoritos(userId);

    favoritos.forEach((favorito)=>{
        const {_id, libro} = favorito;

        favContainer.innerHTML += `
        <div class="cardScroll">
            <div class="cardBody">
                <div class="cardLeftPart">
                    <div class="bookImg">
                        <img src="../img/bookportrait.jpg" alt="bookFrontCase">
                    </div>
                    <div class="bookGenre">
                        <ul>
                            <li>${libro.genero}</li>
                            <li>${libro.autor}</li>
                        </ul>
                    </div>
                    <div class="cardRightPart">
                        <div class="bookTitle">
                            <h3>${libro.nombre}</h3>
                            <button class="reseña" bookId="${libro._id}">reseñas</button>
                            <button class="deleteFav" bookId="${_id}">remover de favoritos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}

async function showReseñas(){
    infoContainer.innerHTML = "";

    const reseñas = await getReseñas("U", userId);

    reseñas.forEach((reseña)=>{
        const {libro, calificacion, comentario} = reseña;

        infoContainer.innerHTML += `
        <div class="cardScroll">
            <div class="cardBody">
                <div class="cardLeftPart">
                    <div class="userRating">
                        <p>${calificacion}<img src="../img/star.png" alt="rating"></p>
                    </div>
                </div>
                <div class="cardRightPart">
                    <div class="bookReviewTitle">
                        <h3>${libro.nombre}</h3>
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

async function showFriendships(){
    infoContainer.innerHTML = "";

    const amigos = await getFriendship(userId);

    amigos.forEach((amigo)=>{
        const {_id, usuario2} = amigo;

        infoContainer.innerHTML += `
        <div class="cardScroll">
            <div class="friendCardBody">
                <div class="cardLeftPart">
                    <div class="userRating">
                        <img src="../img/profileDefault.png" alt="rating">
                    </div>
                </div>
                <div class="friendCardRightPart">
                    <div class="friendUsername">
                        <h3>${usuario2.usuario}</h3>
                        <button class="perfil" userId="${usuario2._id}">Perfil</button>
                        <button class="borrarAmigo" friendshipId="${_id}">Eliminar</button> 
                    </div>
                </div>
            </div>
        </div>
        `;
    })
}

infoContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains("perfil")){
        const id = e.target.getAttribute("userId");
        window.location.href = `usuario.html?userId=${id}`;
    } else if (e.target.classList.contains("borrarAmigo")){
        if (userId != localId){
            alert("No puedes borrar los amigos de otras personas!!!!")
        } else {
            const id = e.target.getAttribute("friendshipId");
            deleteFriendship(id);
        }
    }
});
favContainer.addEventListener('click', (e)=>{
    e.preventDefault();
    if (e.target.classList.contains('reseña')){
        const id = e.target.getAttribute('bookId');
        window.location.href = `libro.html?bookId=${id}`;
    } else if (e.target.classList.contains('deleteFav')){
        if (userId != localId){
            alert("No puedes borrar los favoritos de otros usuarios!!!!")
        } else {
            const id = e.target.getAttribute('bookId');
            deleteFavorito(id);
        }
    }
});

logOut.addEventListener('click', ()=>{
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    window.location.href = "../index.html";
})
userFriendsButton.addEventListener('click', showFriendships);
userHomeButton.addEventListener('click', showReseñas);
document.addEventListener("DOMContentLoaded", ()=>{
    showFavoritos();
    showReseñas();
    getUserInfo();
})