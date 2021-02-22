import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateP2SHWallet } from './wallets';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('Hello Everybody');
});

app.post('/wallets/multisig', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const address = generateP2SHWallet(req.body.n, req.body.m, req.body.publicKeys);
  res.send({ address });
});

const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`App listening to port ${port}`));