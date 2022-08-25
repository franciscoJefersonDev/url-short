import express from 'express';
import path from 'path';
import cors from 'cors';
import files from './files';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 3000;



console.log(files)
app.post('/', (req, res) => {
  const data = req.body;
  files.push(data);
})

app.post('/url', (req, res) => {
  console.log(req.body)
  //res.send()
})


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));