import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateP2SHWallet, generateBip49Wallet, generateBech32Wallet } from './wallets';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('Hello Everybody');
});

app.post('/wallets/multisig', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let address: string | undefined;
  const {
    n,
    m,
    publicKeys,
  } = req.body;
  try {
    address = generateP2SHWallet(n, m, publicKeys);
    res.send({ address })
  } catch (WalletError) {
    res.status(WalletError.status).send(WalletError);
  }
});

app.post('/wallets/segwit/bip49', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {
    mnemonic,
    path,
  } = req.body;

  try {
    const wallet = generateBip49Wallet(mnemonic, path);
    res.send(wallet);
  } catch (WalletError) {
    res.status(WalletError.status).send(WalletError);
  }
});

app.post('/wallets/segwit/bech32', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {
    mnemonic,
    path,
  } = req.body;

  try {
    const wallet = generateBech32Wallet(mnemonic, path);
    res.send(wallet);
  } catch (WalletError) {
    res.status(WalletError.status).send(WalletError);
  }
});

const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`App listening to port ${port}`));