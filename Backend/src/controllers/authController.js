import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;

    // check if user already exist
    const userExist = await prisma.user.findUnique({
        where: {email: email},
    });

    if(userExist){
        return res.status(400).json({status: 400, error: "User already exists with this email"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the User 
    const user = await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    });

    // Generate the JWT token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user:{
                id: user.id,
                name: name,
                email: email,
            }
        },
        token
    });

    } catch (error) {
        console.error(`Register Error: ${error}`);
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
        });
    }
}


const login = async (req, res) => {
   try {
     const {email, password} = req.body;

    // check if user email exist in the table
    const userExist = await prisma.user.findUnique({
        where: {email: email},
    });

    if(!userExist){
        return res.status(401).json({error: "Invalid email or password"});
    }

    // verify the password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if(!isPasswordValid){
        return res.status(401).json({error: "Invalid email or password"});
    }

    // Generate JWT token
    const token = generateToken(userExist.id, res);
    
    res.status(201).json({
        status: "Success",
        data: {
            user: {
                id: userExist.id,
                name: userExist.name,
                email: email,
            },
            token,
        }
    });

   } catch (error) {

    console.error(`Error logging: ${error}`);
    return res.status(500).json({
        status: "Error",
        error: "Internal Server error",
    });
    
   }
};

const logOut = async(req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        status: "Success",
        message: "Logged out successfully",
    });
};

export {register, login, logOut};