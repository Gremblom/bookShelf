const url = "http://localhost:8000";
const jwt = localStorage.getItem("jwt");

const register = async (usuario)=>{
    try {
        const response = await fetch(`${url}/usuarios`, {
            method : 'POST',
            body : JSON.stringify(usuario),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const login = async (usuario)=>{
    try {
        const response = await fetch(`${url}/auth/login`, {
            method : 'POST',
            body : JSON.stringify(usuario),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const verify = async ()=>{
    try {
        const token = await fetch(`${url}/auth/verify`, {
            method : 'POST',
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        return await token.json();
    } catch (error) {
        console.log(error);
    }
}

const getLibros = async ()=>{
    try {
        const response = await fetch(`${url}/libros`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

const getLibro = async (id)=>{
    try {
        const response = await fetch(`${url}/libros/${id}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

const getFavoritos = async (id)=>{
    try {
        const response = await fetch(`${url}/fav/${id}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        
    }
}

const postFavorito = async (favorito)=>{
    try {
        const response = await fetch(`${url}/fav`, {
            method : 'POST',
            body : JSON.stringify(favorito),
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteFavorito = async (id)=>{
    try {
        await fetch(`${url}/fav/${id}`, {
            method : 'DELETE',
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = `usuario.html?userId=${localStorage.getItem("userId")}`;
    } catch (error) {
        console.log(error);
    }
}

const getReseñas = async (collection, id)=>{
    try {
        const response = await fetch(`${url}/resenas/resena${collection}/${id}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

const postReseña = async (reseña, id)=>{
    try {
        await fetch(`${url}/resenas/${id}`, {
            method : 'POST',
            body : JSON.stringify(reseña),
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = `libro.html?bookId=${id}`;
    } catch (error) {
        console.log(error);
    }
}

const getUsuario = async (id)=>{
    try {
        const response = await fetch(`${url}/usuarios/${id}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

const search = async (coleccion, criterio)=>{
    try {
        const response = await fetch(`${url}/search/${coleccion}/${criterio}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
} 

const getFriendship = async (id)=>{
    try {
        const response = await fetch(`${url}/amigos/${id}`);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

const postFriendship = async (friendship)=>{
    try {
        const response = await fetch(`${url}/amigos`, {
            method : 'POST',
            body : JSON.stringify(friendship),
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteFriendship = async (id)=>{
    try {
        await fetch(`${url}/amigos/${id}`, {
            method : 'DELETE',
            headers : {
                jwt,
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = `usuario.html?userId=${localStorage.getItem("userId")}`
    } catch (error) {
        
    }
}

export {
    register,
    login,
    verify,
    getLibros,
    getLibro,
    getFavoritos,
    postFavorito,
    deleteFavorito,
    postReseña,
    getReseñas,
    getUsuario,
    search,
    getFriendship,
    postFriendship,
    deleteFriendship
}