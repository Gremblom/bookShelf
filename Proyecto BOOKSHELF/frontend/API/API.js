const url = "http://localhost:8000";

const register = async (usuario)=>{
    try {
        await fetch(`${url}/usuarios`, {
            method : 'POST',
            body : JSON.stringify(usuario),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = "./login.html"
    } catch (error) {
        console.log(error);
    }
}

const login = async(usuario)=>{
    try {
        const response = await fetch(`${url}/auth/login`, {
            method : 'POST',
            body : JSON.stringify(usuario),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const datos = await response.json();
        return datos.token;
    } catch (error) {
        console.log(error);
    }
}

export {
    register,
    login
}