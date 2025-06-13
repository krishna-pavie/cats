import { HttpException } from "@nestjs/common";

export default class Utils {
    static errorResponse(error){
        const payload = {
            statusCode: error.status,
            message: error.message,
            timestamp: new Date().toISOString(),
        };
        
        throw new HttpException(payload, error.status);
    }
    
}