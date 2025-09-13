import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authProtector ( req, res, next){

    try {     
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) res.status(401).json({message: "Token Not found , Access Denied"})

    const decoded =  jwt.verify(token,process.env.SECRET_KEY);

      const user = await User.findById({_id :decoded.userId})

      if(!user) res.status(400).json({message: "Token Not Found"})

        req.user = user;
        next();
        
    } catch (error) {
        res.status(400).json(error)
        console.log("error in Middlewear :"+error);
        
    }

}
