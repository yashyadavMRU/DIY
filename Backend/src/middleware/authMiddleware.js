import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import "dotenv/config";

// Read the token from te requset
// Check the token is valid
export const authMiddleware = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")){
        token = req.headers.authorization.split(" ")[1];

    }else if(req.cookies?.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        return res.status(401).json({status: 401, error: "Not authorized, no token provided"});
    }

    try {
        // Verify the token and extract the userId
        const decoded = jwt.verify(token, process.env.JWT_SCERET);

        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        if(!user){
            return res.status(401).json({status: 401, error: "User no longer exist"});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({status: 401, error: "Invalid or expired token"});
    }
}