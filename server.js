import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.js';
import wordRoutes from './routes/wordRoutes.js';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

// to initialize a  express app
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares;
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());

// routes;

app.use('/words', wordRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running at port ${port}`));
