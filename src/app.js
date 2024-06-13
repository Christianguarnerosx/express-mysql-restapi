//Aqui se declara toda la config de la app (endpoints importados/middlewares)
import express, { urlencoded } from 'express';
import usuariosrutas from './routes/usuarios.routes.js'
import usuariorutas from './routes/usuario.routes.js'

//Creacion de la app de express
const app = express();

//middlewares de express
app.use(express.json()) //para decifrar/traducir/entender json
app.use(express.urlencoded({ extended: true })) //Para poder obtener/traducir parametros json desde la url 

//endpoints importados
app.use(usuariosrutas);
app.use(usuariorutas);

//middlewere propio de si no se encuentra ninguna ruta
app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint no encontrado"
    })
})

//Se exporta el app para que en index (que durante todo el desarrollo tenia todo este file)
// Index pueda hacer uso de su metodo listen y comenzar con el servidor de express (iniciar todo)
export default app;