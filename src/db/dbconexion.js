//Creacion de la conexion de la db

//El conector de express y mysql npm i 'mysql2' se agrega el '/promise' para que las peticiones sean asincronas y puedan ejecutarse sin parar el hilo principal
import { createPool } from 'mysql2/promise';

//importamos desde el file de config todas las variables de entorno obtenidas en el desde el .env
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } from '../config.js'

//Creamos una constante que tenga la conexion y le ponemos el export para mandarla a traer en otros files los cuales 
// ocupen hacer consultas con esta conexion
export const conexion = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT //Es opcional pero si se necesita ahi esta en lugar de ponerlo en el host
})