import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import '../../containers';
import '../typeorm';
import handleErrosMiddleware from './middlewares/handleError';

const PORT = 3333;

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);
app.use(handleErrosMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Runing on port ${PORT}`);
});
