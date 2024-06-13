import { conexion } from '../db/dbconexion.js'

export const getusuarios = async (req, res) => {
    const query = 'Select * from usuarios';

    const [resultado] = await conexion.query(query);

    res.send(resultado);
}