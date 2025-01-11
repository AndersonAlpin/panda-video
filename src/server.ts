import app from './app';
import dotenv from 'dotenv';
import { envConfig } from './config/envConfig';
import "./config/redisConnection";

dotenv.config();

const port = process.env.PORT || envConfig.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});