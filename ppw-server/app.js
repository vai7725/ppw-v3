// packages
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// modules
import { connectDB } from './config/connect.db.js';
import papersRoutes from './routes/papers.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';
import generalRoutes from './routes/general.routes.js';
import authorizedRoutes from './routes/authorized.routes.js';
import contributionRoute from './routes/contribution.routes.js';

// variables
const app = express();
const port = process.env.PORT || 3000;

// middlewares
config();
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URI, process.env.CLIENT_URI_PROD],
    credentials: true,
  })
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', papersRoutes);
app.use('/contact', contactRoutes);
app.use('/auth', authRoutes);
app.use('/general', generalRoutes);
app.use('/authorized', authorizedRoutes);
app.use('/contribute', contributionRoute);

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
