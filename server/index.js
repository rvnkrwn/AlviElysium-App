import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {dbPool} from './config/database.js';
import UserRouter from './routes/UserRouter.js';

const app = express();
dotenv.config();


app.use(cors({
    origin: (origin, callback) => {
        if ('http://localhost:3000' === origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(morgan("combined"));

dbPool.getConnection().then(() => {
    console.log("database connected")
}).catch((e) => {
    console.log(e)
})

app.get('/', (req, res) => {
    res.status(200).json({message: "REST API FOR ALVIELYSIUM"});
});

app.use(UserRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running and up at port ${PORT}`);
});
