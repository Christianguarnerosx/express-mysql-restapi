//Los controllers son utilizados normalmente para declarar todas las acciones (consultas/peticiones)
/*Que posteriormente se podran exportar e importar en otros files (.routes) los cuales solo importaran este file y en el endpoint 
solo mandaran a traer el modulo especifico que quiera */

import { conexion } from "../db/dbconexion.js"; //importamos la conexion de la db para poder utilizar la var conexion y hacer consultas

// Primer modulo de obtener 1 usuario mediante un param de la url ejem: '/:id'
export const getusuario = async (req, res) => {
    const id_obtenido = req.params.id_usuario; // se obtienen el param de los datos de la peticion

    //Declaramos la consulta
    const query = `Select t.nombre_tipo_usuario,
                    u.*
                    from usuarios as u
                    inner join tipo_usuarios as t 
                    ON u.id_tipo_usuario = t.id_tipo_usuario
                    where id_usuario = ?`; // el signo ? posteriormente en la ejecucion de la consulta se cambiara por el parametro que vaya despues de la ',' coma

    //Se ejecuta la consulta y se pasa el parametro que sustituira el signo '?' de la condicion
    const [resultado] = await conexion.query(query, [id_obtenido]);

    //Validacion de si trajo rows de la consulta
    if (resultado.length <= 0) {
        //return (res.status(404).send('Not foud'))
        return (res.status(404).json({
            response: 'Not foud el usuario jaja'
        }))
    }

    res.send(resultado);
}

export const createusuario = async (req, res) => {
    //Froma de traemos las respuestas del req por los params /:
    const id_tipo_usuario = req.params.id_tipo_usuario;
    const nombre = req.params.nombre;
    const apaterno = req.params.apaterno;
    const correo = req.params.correo;
    const pass = req.params.pass;
    const telefono = req.params.telefono;

    //Declaramos la consulta
    const query = 'Insert into usuarios (id_usuario, id_tipo_usuario, nombre, apaterno, correo, pass, telefono) value (null,?,?,?,?,?,?)';

    try {
        const resultado = await conexion.query(query, [id_tipo_usuario, nombre, apaterno, correo, pass, telefono])
        res.send('Se inserto con exito')
    } catch (error) {
        console.log('Error al insertar: ' + error)
    }
}

export const updateusuarios = async (req, res) => {
    //Forma de traemos las respuestas del req por el body con json /:
    const id_usuario = req.params.id_usuario;
    const { type, name, lastname, mail, pass, phone } = req.body; //Se trae del json ingresado del body que contiene los campos (con el mismo nombre de los campos se mandan a pedir y declarar)

    //Declaramos la consulta
    const query = `UPDATE usuarios SET
                            id_tipo_usuario = IFNULL(?, id_tipo_usuario),
                            nombre = IFNULL (?, nombre),
                            apaterno = IFNULL(?, apaterno),
                            correo = IFNULL (?, correo),
                            pass = IFNULL (?, pass),
                            telefono = IFNULL (?, telefono)
                    WHERE id_usuario = ?`

    //Se hace dentro de un try catch solo para manejo de errores y no crashee nuestra app/server
    try {
        const [resultado] = await conexion.query(query, [type, name, lastname, mail, pass, phone, id_usuario])

        if (resultado.affectedRows <= 0) {
            res.status(404).send('Not found usuario')
        }

        const [resultadoup] = await conexion.query('Select * from usuarios where id_usuario = ?', id_usuario)


        res.json(resultadoup[0])
    } catch (error) {
        console.log('error no se actualizo debido ah: ' + error)
    }
}

export const updateusuarios2 = (req, res) => {
    const id_obtenido = req.params.id_usuario;
    const id_tipo_usuario = req.params.id_tipo_usuario;
    const nombre = req.params.nombre;
    const apaterno = req.params.apaterno;
    const correo = req.params.correo;
    const pass = req.params.pass;
    const telefono = req.params.telefono;

    const query = 'UPDATE usuarios SET id_tipo_usuario = ?, nombre = ?, apaterno = ?, correo = ?, pass = ?, telefono = ? WHERE id_usuario = ?'

    try {
        const consulta = conexion.query(query, [id_tipo_usuario, nombre, apaterno, correo, pass, telefono, id_obtenido])
        res.send('Se actualizo con exito')
    } catch (error) {
        console.log('eroor al actualizar' + error)
    }
}

export const deleteusuario = async (req, res) => {
    const id_obtenido = req.params.id_usuario;
    const query = 'Delete from usuarios where id_usuario = ?'

    try {
        const [resultado] = await conexion.query(query, [id_obtenido])
        console.log(resultado)

        if (resultado.affectedRows <= 0) {
            res.status(404).send('Not found usuario')
        }

        res.sendStatus(204)
    } catch (error) {
        console.log('error no se actualizo debido ah: ' + error)
    }
}