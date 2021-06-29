import { dao } from './../dao/usuarioDAO';
import { utils } from './../utils/utils';
import { Request, Response } from 'express';
class UsuarioController{

    /***
     * Nombre:_lista
     * Descripcion_lista los usuairos de la base de datos
     * resultado:json con informacion del usuario
     */
    public async lista(req: Request, res:Response){
        const result = await dao.lista();

        res.json(result);
    }
/**
 *  Nombre: insert
 * Descripcion:Insertar datos del usuario
 * resultado:json con mensaje
 */
    public async insert(req: Request,res:Response){
        try{
            const{usuario,password,cveRol} = req.body;

            //verificar parametros
            if(usuario == null || password == null || cveRol == null){
                return res.status(409).json({message:'Los campos son requeridos'});
            } 
            //verificar caracteries
            console.log(usuario.length);
            
            if(usuario.length >150)
            return res.status(500).json({message:"la longitud maxima del usuario es de 150 caracteres"});
            
            //verificar nombre de usuario
            const verify = await dao.verificarUsuario(usuario);
            if(verify.length >0)
            return res.status(500).json({message:"El usuario ya existe"})
            
            //verificar rol
            const verifyRol = await dao.verificarRol(cveRol);
            if(verifyRol.length <= 0)
            return res.status(500).json({message:"El rol no existe o no exta disponible"})
            

            //encriptar contraseña
            const encryptedPassword = await utils.hashPassword(password);
            
            //llenar objetos
            const user = {
                usuario,
                password :encryptedPassword,
                cveRol
            }

            //insercion de datos
            const result = await dao.insert(user);

            if(result.affectedRows > 0)
             return  res.json({message : 'Datos guadados'});
            else
              return res.status(409).json({message:result.message});

            res.json(result);
        }
        catch (ex){
            console.log(ex.menssage);
            res.status(500).json({message: ex.menssage});
            

        }
            
    }
}
 export const usuarioController = new UsuarioController();