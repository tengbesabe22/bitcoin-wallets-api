import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Everybody');
});

const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`App listening to port ${port}`));