const isAdmin = async (req, res, next)=>{
    if (!req.usuario){
        return res.json({
            msg : "Usuario obligatorio"
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN'){
        return res.status(401).json({
            msg : `${nombre} no es administrador`
        })
    }

    next();
}

export default isAdmin;