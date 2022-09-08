const express = require('express');
const app = express();
const fs = require('fs');


app.use('/assets', express.static('./public/assets', { root: process.cwd() }));
//ruta que a controlar       ruta publica (ruta local a devolver y el 2do parametro desde donde la encontrará) 

app.use('/abracadabra/juego/:usuario', (request, response, next) => {
  const nombre = request.params.usuario;
  let usuariosJSON = JSON.parse(fs.readFileSync("usuarios.json", "utf8"));
  usuariosJSON.usuarios.includes(nombre)
    ? next()
    : response.status(404).send(`<div align="center"><img src="/assets/img/who.jpeg" alt="Usuario Desconocido." /><br><b><h2>${nombre}, no es usuario.</b></h2></div>`);

});
app.get('/abracadabra/juego/:usuario', (request, response) => {
  response.sendFile('./public/index.html', { root: process.cwd()});
});

app.get("/abracadabra/conejo/:n", (request, response) => {
  const n = request.params.n;
  const numero = Math.floor(Math.random() * 4) + 1;

  console.log(`El número recibido es ${n}`);
  console.log(`El número aleatorio es ${numero}`);

  numero == n
    ? response.sendFile('./public/assets/img/conejito.jpg', { root: process.cwd() })
    : response.sendFile('./public/assets/img/voldemort.jpg', { root: process.cwd() });
});

app.get('/abracadabra/usuarios', async (request, response) => {
  response.sendFile('./usuarios.json', { root: process.cwd() });
});


app.all('*', (request, response) => response.status(404).json({ code: 404, message: 'Page not found :.(' }));


app.listen(process.env.PORT || 3000);

module.exports = { app };