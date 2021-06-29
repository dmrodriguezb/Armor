import { Request, Response } from 'express';
import { dao } from  '../dao/indexDAO';

class IndexControler{
    public async lista(req:Request, res:Response): Promise<void>{
        const result = await dao.test();
        res.json(result);
        
    }
    insertar (req:Request, res:Response){
        res.json({message:'Insert Data'})
    }
   
    actualizar (req:Request, res:Response){
        res.json({message:' Update Data'})
    }

    eliminar (req:Request, res:Response){
        res.json({message:'Delete Data'})
    }
    
}

export const indexControler = new IndexControler();