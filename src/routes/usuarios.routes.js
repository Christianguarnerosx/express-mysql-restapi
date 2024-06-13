import { Router } from 'express';
import { getusuarios } from '../controllers/usuarios.controllers.js'

const rutas = Router();

rutas.get('/usuarios', getusuarios);

export default rutas