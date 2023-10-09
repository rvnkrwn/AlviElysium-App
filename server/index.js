import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {dbPool} from './config/database.js';
import UserRouter from './routes/UserRouter.js';
import CategoryRouter from './routes/CategoryRouter.js';
import StoryRouter from './routes/StoryRouter.js';
import EpisodeRouter from './routes/EpisodeRouter.js';

const app = express();
dotenv.config();

// app.use(cors({
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     origin: (origin, callback) => {
//         const allowOrigin = ['http://localhost:3000'];
//         if (allowOrigin.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// }));

app.use(cors())
app.use(express.json());
app.use(morgan("combined"));

dbPool.getConnection().then(async () => {
    console.log("database connected");
}).catch((e) => {
    console.log(e)
})

app.get('/', (req, res) => {
    res.status(200).json({message: "REST API FOR ALVIELYSIUM"});
});

app.use(UserRouter);
app.use(CategoryRouter);
app.use(StoryRouter);
app.use(EpisodeRouter)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running and up at port ${PORT}`);
});
