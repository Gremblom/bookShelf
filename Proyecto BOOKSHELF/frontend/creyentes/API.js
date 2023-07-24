const url = "http://localhost:4444/creyentes";

export const getCreyentes = async ()=>{
    try {
        const respuesta = await fetch(`${url}/all`);
        const datos = respuesta.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const getCreyente = async (id)=>{
    try {
        const respuesta = await fetch(`${url}/one/${id}`);
        const datos = respuesta.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const nuevoCreyente = async (creyente)=>{
    try {
        await fetch(`${url}/add`,{
            method : "POST",
            body : JSON.stringify(creyente),
            headers : {
                'Content-Type':'application/json'
            }
        });
        window.location.href = "index.html";
    } catch (error) {
        console.log(error);
    }
}

export const borrarCreyente = async (id)=>{
    try {
        await fetch(`${url}/del/${id}`,{
            method : "DELETE"
        });
        window.location.href = "index.html";
    } catch (error) {
        console.log(error);
    }
}

export const getMinisterioHombre = async ()=>{
    try {
        const result = await fetch(`${url}/min/all`);
        const datos = result.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const getRutaEnviados = async ()=>{
    try {
        const result = await fetch(`${url}/env/all`);
        const datos = result.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const getAdultos = async ()=>{
    try {
        const result = await fetch(`${url}/adl/all`);
        const datos = result.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const getFormacionAncianos = async ()=>{
    try {
        const result = await fetch(`${url}/anc/all`);
        const datos = result.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}