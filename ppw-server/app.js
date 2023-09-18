// packages
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// modules
import { connectDB } from './config/connect.db.js';
import papersRoutes from './routes/papers.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';

// variables
const app = express();
const port = process.env.PORT || 3000;

// middlewares
config();
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URI],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', papersRoutes);
app.use('/contact', contactRoutes);
app.use('/auth', authRoutes);

// routes
app.get('/', (req, res) => {
  res.send('Hello server');
});

// listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`App started listening at ${port}`));
  } catch (error) {
    console.log('The error is', error);
  }
};

start();
