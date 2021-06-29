import { jwt } from 'jsonwebtoken';
import { utils } from './../utils/utils';
import { dao } from './../dao/authDAO';
import { Request, Response } from 'express';
import secretKey from '../config/jwtKey';
class AuthController{
/**
 * Nombre:login
 * Description: metodo que comprueba los datos de acceso del usuario
 */
    public async login(req:Request,res:Response){

        const{usuario,password} = req.body;

        if(usuario == null || password == null)
            return res.statis(400).json({message:"Usuario y contraseña incorrecta"});
        const users = await dao.getUser(usuario);

        //verificar si existe el usuario
        if(users.length<=0)
        return res.status(400).json({message:"El usuario no existe"});
        
        for (let user of users){
            if(await utils.checkPassword(password, user.password)){
                const token = jwt.sign({cveUsuario: user.cveUsuario, usuario, cveRol:user.cveRol},secretKey.jwtSecret, {expiresIn:'1h'});
                return res.json({message: "OK",token,cveUsuario: user.cveUsuario, usuario, cveRol:user.cveRol });
            }else{
                return res.status(400).json({message:"El contraseña es incorrecta"});

            }
            
        }
    }
}
export const authController = new AuthController();