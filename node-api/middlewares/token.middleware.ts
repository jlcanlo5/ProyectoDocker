import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {APIUtils, ApiStatusEnum} from '../utils/api.utils'
import ENV from '../enviroments/env.production'


export default (CONFIG:any)=> {
    const apiUtils=APIUtils(CONFIG);
    return { 
        verify: (req: Request, res: Response, next: NextFunction) => {
            const bearerHeader= req.headers['authorization'];
            if (typeof bearerHeader !== 'undefined')
            {
                const bearer = bearerHeader.split(' ');
                const bearerToken=bearer[1];

                jwt.verify(bearerToken, CONFIG.TOKEN.SECRET_KEY, (err: any, tokenDecoded:any) =>{
                    if (err)
                    {
                        return res.status(ApiStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(ApiStatusEnum.Forbidden, 
                            //Descripcion
                            'Acceso prohibido al verificar el token (Middleware TOKENs)',
                            //Mensaje
                            'El token proporcionado no es un token válido. Favor de verificar',
                            //Result
                            {},
                            //Error
                            err,
                            //Notificacion
                            
                                )
                        )
                    }
                    req.body.authUser=tokenDecoded;
                    next();
                });
            }
            else{
                //Enviar estatus de no autorizado
                return res.status(ApiStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(ApiStatusEnum.Unauthorized, 
                    //Descripcion
                    'Acceso no autorizado (Middleware TOKENs)',
                    //Mensaje
                    'Necesita proporcionar un token para acceder a la solicitud',
                    //Result
                    {},
                    //Error
                    {},
                    //Notificacion

                        )
                )
            }
        }
    }
}