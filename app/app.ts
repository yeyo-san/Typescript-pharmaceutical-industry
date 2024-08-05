import express from 'express';
import routes from './routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 