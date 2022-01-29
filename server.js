const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

/* 
echo "# delilah_backend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/patriciacr0107/delilah_backend.git
git push -u origin main


git remote add origin https://github.com/patriciacr0107/delilah_backend.git
git branch -M main
git push -u origin main
 */
