import { NextRequest, } from "next/server"
import jwt from "jsonwebtoken"

export const getDataFromToken = (request:NextRequest)=>{

    interface DecodedToken {
        id: string; // Ensure this matches your JWT payload structure
    }
    
    try {
        const token = request.cookies.get("token")?.value || "" ;

    const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken

    return decodedToken.id;

    } catch (error:unknown) {
        if(error instanceof Error){
        throw new Error(error.message)
        }
        throw new Error("An unknown error occcured");
    }
}