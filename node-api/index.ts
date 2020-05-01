    // Express Imports
    import Express from 'express';
    import { Request, Response } from 'express'
    // Debug and Color Imports
    import { DEBUG, COLOR } from './utils/debug';
    // API Utils Import
    import { APIUtils, ApiStatusEnum } from './utils/api.utils';
    // JsonWebTokens Import
    import jwt from 'jsonwebtoken';
    // Acceder a las variables de entorno
    import ENV from './enviroments/env.production'
    // JSON Web Tokens Middleware
    import AuthToken from './middlewares/token.middleware';
    const token = AuthToken(ENV);

    import MongoDBHelper from './helpers/mongodb.helper';
    import MongoDBClient from 'mongodb'
    
    // Variables Declaration
    const debug = DEBUG();
    const color = COLOR();
    const app = Express();
    const apiUtils = APIUtils(ENV);
    const mongodb = MongoDBHelper.getInstance(ENV);
    
    app.use(Express.urlencoded({extended: true}));
    app.use(Express.json());
    // cors
    
    // Routes
    app.post('/login', (req: Request, res: Response) => {
    
    console.log('BODY: ', req.body);
    
    const {userName, password} = req.body;
    const mockUser = {
    fullName: 'Juan Luis Martínez Rocha',
    userName: 'jmartinezr',
    password: 'hola123',
    email: 'jl.canlo@yahoo.com.mx'
    }
    const mockRoles = ['Capture_Rol', 'Admon_Catalogs_Rol', 'Print_Rol']
    // Validar usuario y contraseña
    if (userName == mockUser.userName && password == mockUser.password) {
    // Build Payload
    const payload = {
    fullName: mockUser.fullName,
    userName: mockUser.userName,
    email: mockUser.email,
    roles: mockRoles
    }
    // Generar el Token para ese usuario
    jwt.sign(payload, ENV.TOKEN.SECRETKEY, { expiresIn: ENV.TOKEN.EXPIRES }, (err, token) => {
    // Existe Error
    if (err) {
    return res.status(500).json(
    apiUtils.BodyResponse(
    ApiStatusEnum.Internal_Server_Error, 
    'Internal Server Error', 
    'Error al intentar crear el Token', 
    null, 
    err
    )
    )
    }
    // OK
    res.status(200).json(
    apiUtils.BodyResponse(
    ApiStatusEnum.Success, 
    'OK', 
    'Token generado de forma correcta', 
    {
    userName: mockUser.userName,
    token 
    }, 
    null
    )
    )
    });
    }
    else {
    res.status(403).json(
    apiUtils.BodyResponse(
    ApiStatusEnum.Forbidden, 
    'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla', 
    'Credenciales Invalidas. El usuario y/o contraseña proporcionados no son válidos. Favor de verificar.', 
    {
    msg: 'Invalid Credentials'
    }, 
    null
    )
    )
    }
    });
    
    app.get('/products', token.verify, async (req: Request, res: Response) => {
    
    const productos = await mongodb.db.collection('cars').find({}).toArray();
    res.status(200).json(
    apiUtils.BodyResponse(
    ApiStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
    { 
    productos,
    authUser: req.body.authUser
    }
    )
    );
    
    });

    app.get('/product/:id', token.verify, async (req: Request, res: Response) => {
    
        const {id} = req.params;
        const _id = new MongoDBClient.ObjectID(id);

        const productos = await mongodb.db.collection('cars').find({_id}).toArray();
        res.status(200).json(
        apiUtils.BodyResponse(
        ApiStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        { 
        productos,
        authUser: req.body.authUser
        }
        )
        );
        
        });
    
    // Start Express Server
    app.listen(ENV.API.PORT, async() => {
        //Conectando con MongoDB
    try {
        await mongodb.connect();
    }
    catch {
        
    }
        mongodb.connect();
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.warning('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
    });