import express from 'express';
import path from 'path';
import files from './files';
const app = express();
const PORT = 3000;



console.log(files)
app.get('/get/:route', (req, res) => {
  const route = req.params.route
  const file = files.filter(item => item.routeName === route)
  console.log(file)
  if(file.length > 0) {
    res.sendFile(path.resolve(__dirname, `files/${files[0].fileName}`))
  } else {
    res.send('This route not exist!')
  }
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));