export enum ApiStatusEnum {
    Success=200,
    Create=201,
    Bad_Request=400,
    Unauthorized=401,
    Internal_Server_Error=500,
    Forbidden=403
};

export const APIUtils=(ENV:any)=>{
    return {
        BodyResponse: (status: ApiStatusEnum, description: string, message: string, result: any = null, error: any = null) => {
            return {
                microService: ENV.API.NAME, 
                enviroment: ENV.API.ENVIROMENT,
                status,
                description, 
                message,
                result,
                error
            }
        }
    }
}