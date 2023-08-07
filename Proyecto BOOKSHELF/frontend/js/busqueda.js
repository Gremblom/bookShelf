import {search, postFriendship} from "../API/API.js";

const cardsContainer = document.querySelector("#cardsContainer");
const searchForm = document.querySelector("#searchbar");
const userId = localStorage.getItem("userId");
const user = document.querySelector("#user");
const userFav = document.querySelector("#userFav");

user.innerHTML = `
<a  id="user" href="usuario.html?userId=${userId}"><img src="../img/profileDefault.png" alt="logoletter.png"></a>
`;
userFav.innerHTML = `<img src="../img/guardado.png" alt="guardado.png"><a href="usuario.html?userId=${userId}">Guardados</a>`;

function booksSearch(){
    const coleccion = document.querySelector("#coleccion").value;
    const criterio = document.querySelector("#criterio").value;

    if (criterio == "" || coleccion == ""){
        alert("Todos los campos son obligatorios");
    } else {
        showBooks(coleccion, criterio);
    }
}

async function showBooks(coleccion, criterio){
    cardsContainer.innerHTML = "";
    
    const libros = await search(coleccion, criterio)
 
    if (libros == ""){
        cardsContainer.innerHTML = "<h2>Tu búsqueda no concuerda con ningún libro</h2>";
    } else {
        libros.forEach((libro)=>{
            const {_id, nombre, genero, autor, sinopsis} = libro;

            cardsContainer.innerHTML += `
            <div class="cardScroll">
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
                        <div class="bookTitle">
                            <h3>${nombre}</h3>
                        </div>
                        <div class="bookSummary">
                            <h5>Sinopsis</h5>
                            <p>${sinopsis}</p>
                            <button class="reseña" bookId="${_id}">Reseñas</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
    }
}

function usersSearch(){
    const coleccion = document.querySelector("#coleccion").value;
    const criterio = document.querySelector("#criterio").value;

    if (criterio == "" || coleccion == ""){
        alert("Todos los campos son obligatorios");
    } else {
        showUsers(coleccion, criterio);
    }
}

async function showUsers(coleccion, criterio){
    cardsContainer.innerHTML = "";

    const usuarios = await search(coleccion, criterio);

    if (usuarios == ""){
        cardsContainer.innerHTML = "<h2>Tu búsqueda no concuerda con ningun usuario</h2>"
    } else {
        usuarios.forEach((registro)=>{
            const {_id, usuario} = registro;

            cardsContainer.innerHTML += `
            <div class="cardScroll">
                <div class="friendCardBody">
                    <div class="cardLeftPart">
                        <div class="cardProfileUser">
                            <img src="../img/profileDefault.png" alt="rating">
                        </div>
                    </div>
                    <div class="friendCardRightPart">
                        <div class="friendUsername">
                            <h3>${usuario}</h3>
                            <button class="perfil" userId="${_id}">Perfil</button>
                            <button class="friend" userId="${_id}">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
    }
}

async function addFriend(id){
    const amigo = {
        usuario2 : id
    }

    if (amigo.usuario2 == ""){
        console.log("Usuario inválido");
    } else  if (amigo.usuario2 == userId){
        alert("No puedes agregarte a ti mismo!!!!");
    } else {
        const datos = await postFriendship(amigo);
        
        if (!datos.available){
            alert(datos.msg);
        }
    }
}

cardsContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('reseña')){
        const id = e.target.getAttribute("bookId");
        window.location.href = `libro.html?bookId=${id}`
    } else if (e.target.classList.contains("perfil")){
        const id = e.target.getAttribute("userId");
        window.location.href = `usuario.html?userId=${id}`
    } else if (e.target.classList.contains('friend')){
        const id = e.target.getAttribute("userId");
        addFriend(id);
    }
});
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const coleccion = document.querySelector("#coleccion").value;

    if (coleccion == "libros"){
        booksSearch();
    } else {
        usersSearch();
    }
});