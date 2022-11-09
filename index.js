import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import login from "./Modules/Login.js";

const app = express();


dotenv.config();
app.use(express.json())
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT;

console.log(PORT)


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post('/login',login)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));