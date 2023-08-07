import {getLibros} from "../API/API.js";

const cardsContainer = document.querySelector('#cardsContainer');
const userId = localStorage.getItem("userId");
const user = document.querySelector("#user");
const userFav = document.querySelector("#userFav");

user.innerHTML = `
<a  id="user" href="usuario.html?userId=${userId}"><img src="../img/profileDefault.png" alt="logoletter.png"></a>
`;
userFav.innerHTML = `<img src="../img/guardado.png" alt="guardado.png"><a href="usuario.html?userId=${userId}">Guardados</a>`;

async function showLibros(){
    cardsContainer.innerHTML = '';
    const libros = await getLibros();

    libros.forEach((libro)=>{
        const {_id, autor, nombre, genero, sinopsis} = libro;

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
                    <button class="reseña" libro="${_id}">Reseñas</button>
                </div>
            </div>
        </div>
    </div>
        `;
    })
}

cardsContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains("reseña")){
        const id = e.target.getAttribute("libro");
        window.location.href = `libro.html?bookId=${id}`;
    }
})
document.addEventListener('DOMContentLoaded', showLibros);