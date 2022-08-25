import express from 'express';
import path from 'path';
import cors from 'cors';
import files from './files';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 3000;



app.post('/set', (req, res) => {
  const data = req.body;
  const dataURL = files.filter(item => item.route === data.route)
  if(dataURL.length === 0) {
    files.push(data);
    res.json({ok: true, url: `https://3000-franciscojefer-urlshort-zyhc8q8rlej.ws-us63.gitpod.io/${data.route}`})
    console.log(files)
    return
  }
  res.status(400).send('Esta rota já existe!')
})

app.get('/:route', (req, res) => {
  const route = req.params.route;
  const dataURL = files.filter(item => item.route === route)
  if(dataURL.length > 0) {
    res.redirect(dataURL[0].origin)
    return 
  }
  res.send('Not found!')
})


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));