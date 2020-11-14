import express from 'express';

const PORT = 3333;

const app = express();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Runing on port ${PORT}`);
});
