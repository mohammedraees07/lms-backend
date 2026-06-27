import 'dotenv/config'


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT
const jwtSecret = process.env.JWT_SECRET_KEY

// Application configuration validation

if(!PORT){
    throw new Error("PORT is missing! ");
    
} //Fail Fast principle. (it breaks bfr server starts)

if(!MONGO_URI){
    throw new Error("MONGO_URI is missing!")
    
}


if(!jwtSecret){
    throw new Error("Secret key is missing");
    
}
    
const config =  {
    MONGO_URI,
    PORT,
    jwtSecret
}

export default config