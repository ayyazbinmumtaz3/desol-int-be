import cors from "cors";
import 'dotenv/config';
import express from 'express';
import { AuthRoutes, CarRoutes } from "../routes/index.js";

const app = express();
app.use(cors({
    origin: '*',
}));



app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT ?? 3000;

// health check
app.get('/', (req, res) => {
    return res.send('App is up and running!');
});

// routes
app.use("/auth", AuthRoutes);
app.use("/car", CarRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})