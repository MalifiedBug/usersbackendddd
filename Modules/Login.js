
import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const mongoClient = mongodb.MongoClient;
const MONGO_URL = "mongodb+srv://omkar123:omkar123@cluster123.hnyyicy.mongodb.net/?retryWrites=true&w=majority"
const SECRET_KEY = "FOUAYFGFBAOEYFGoygbdofly3287yeboayhb@#$#ikh"



const login = async (req, res) => {
    try {

        let client = await mongoClient.connect(MONGO_URL)

        let db = client.db('Macho')

        let user = await db.collection('Users').findOne({email: req.body.email})


        if (user) {

            let matchedPassword = bcrypt.compareSync(req.body.password, user.password);

            if (matchedPassword) {
                let token = jwt.sign({id: user._id}, SECRET_KEY)
                await client.close();
                res.json({
                    message: "Success",
                    token: token
                })
            } else {
                res.status(404).json({
                    message:"Passwords incorrect"
                })
            }
            
        } else {

            res.status(404).json({
                message: "email not found in directory"
            })
            
        }
        
    } catch (error) {

        res.status(403).json({
            message: "Something went wrong!"
        })
        
    }

    
}


export default login