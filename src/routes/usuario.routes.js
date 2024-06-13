//En los archivos routes se manejaran las entradas de los endpoint, asi como el modulo que necesite y que debera traer de los .controllers

//Se utiliza el modlo router qque ya viene con la instalacion de express (NO se instala router aparte)

import { Router } from "express";
import { createusuario, deleteusuario, getusuario, updateusuarios, updateusuarios2 } from '../controllers/usuario.controllers.js'; // Importamos los modulos de los .controllers los cuales contienen todas las acciones de consultas/peticiones. Acciones en general vaya jsjs

//Se crea una constante que tendra todas las acciones/metodos de roter
const rutas = Router()

//Mediante peticiones http se sabe que se hara, la ruta de entrada a nuestro endpoint '/usuarios'
// y seguido del metodo/modulo que hara la accion que solicite
rutas.get('/usuario/:id_usuario', getusuario)
rutas.post('/usuario/:id_tipo_usuario/:nombre/:apaterno/:correo/:pass/:telefono', createusuario)
rutas.put('/usuario/:id_usuario', updateusuarios)
rutas.patch('/usuario/:id_usuario', updateusuarios) //Se usa patch para que los parametros no puestos tomen el que estaba en la db
rutas.put('/usuario/:id_tipo_usuario/:nombre/:apaterno/:correo/:pass/:telefono/:id_usuario', updateusuarios2)
rutas.delete('/usuario/:id_usuario', deleteusuario)

export default rutas
//Se exporta para despues en el app.js o index (dependiendo donde este el metodo principal/de inicio/creacion de express)
//Pueda llamar a este u otros modulo de rutas diferenetes y no se vea todo amontonado