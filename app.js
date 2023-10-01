const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json())
//Se crea la base de datos
let proyectos=[
{id:1, nombre:"Proyecto uno",descripcion:"Proyecto largo",fechaInicio:"01-01-2024",fechaFin:"28-01-2024"},
{id:2, nombre:"Proyecto dos",descripcion:"Proyecto corto",fechaInicio:"01-02-2024",fechaFin:"28-01-2024"},
{id:3, nombre:"Proyecto tres",descripcion:"Proyecto rápido",fechaInicio:"01-03-2024",fechaFin:"28-03-2024"},
{id:4, nombre:"Proyecto cuatro",descripcion:"Proyecto tardado",fechaInicio:"01-04-2024",fechaFin:"28-04-2024"},
{id:5, nombre:"Proyecto cinco",descripcion:"Primer proyecto",fechaInicio:"01-05-2024",fechaFin:"28-05-2024"},
{id:6, nombre:"Proyecto seis",descripcion:"Proyecto final",fechaInicio:"01-06-2024",fechaFin:"28-06-2024"},
{id:7, nombre:"Proyecto siete",descripcion:"Proyecto de titulacion",fechaInicio:"01-07-2024",fechaFin:"28-07-2024"},
{id:8, nombre:"Proyecto ocho",descripcion:"Proyecto introductorio",fechaInicio:"01-08-2024",fechaFin:"28-08-2024"},
{id:9, nombre:"Proyecto nueve",descripcion:"Proyecto diagnostico",fechaInicio:"01-09-2024",fechaFin:"28-09-2024"},
{id:10, nombre:"Proyecto diez",descripcion:"Proyecto imaginario",fechaInicio:"01-10-2024",fechaFin:"28-10-2024"}];

let tareas=[
    {id:1, idProyecto:1, nombre:"Tarea uno",descripcion:"tarea larga",fechaAsign:"01-01-2024",estadoTarea:0},
    {id:11, idProyecto:1, nombre:"Tarea uno terminada",descripcion:"tarea larga pero terminada",fechaAsign:"01-01-2024",estadoTarea:1},
    {id:12, idProyecto:1, nombre:"Tarea uno terminada2",descripcion:"tarea larga pero terminada2",fechaAsign:"01-02-2024",estadoTarea:1},
    {id:100, idProyecto:2, nombre:"Tarea dos",descripcion:"tarea asi nomas",fechaAsign:"01-02-2024",estadoTarea:0},
    {id:3, idProyecto:3, nombre:"Tarea tres",descripcion:"juju tarea",fechaAsign:"01-03-2024",estadoTarea:0},
    {id:4, idProyecto:4, nombre:"Tarea cuatro",descripcion:"jiji tarea",fechaAsign:"01-04-2024",estadoTarea:0},
    {id:5, idProyecto:5, nombre:"Tarea cinco",descripcion:"jeje tareita",fechaAsign:"01-05-2024",estadoTarea:0},
    {id:6, idProyecto:6, nombre:"Tarea seis",descripcion:"una tareisima",fechaAsign:"01-06-2024",estadoTarea:0},
    {id:7, idProyecto:7, nombre:"Tarea siete",descripcion:"chily willy",fechaAsign:"01-07-2024",estadoTarea:0},
    {id:8, idProyecto:8, nombre:"Tarea ocho",descripcion:"Aguas una tarea",fechaAsign:"01-08-2024",estadoTarea:0},
    {id:9, idProyecto:9, nombre:"Tarea nueve",descripcion:"Padriuris",fechaAsign:"01-09-2024",estadoTarea:0},
    {id:10, idProyecto:10, nombre:"Tarea diez",descripcion:"Mejor no la hagan",fechaAsign:"01-11-2024",estadoTarea:0},
    ];
//Se genera la consulta de todos los proyectos
app.get('/socios/v1/proyectos',(req,res)=>{
    if(proyectos){
        res.status(200).json({
            estado:1,
            mensaje:"Existen proyectos",
            proyectos: proyectos
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron proyectos",
        proyectos: proyectos
    })
    }
})
//Consulta de un comentario en específico
app.get('/socios/v1/proyectos/:id', (req, res) => {
    const id = req.params.id;
    const proyecto = proyectos.find(proyecto => proyecto.id == id); //se ahorra el for
    if (proyecto) {
        res.status(200).json({
            estado: 1,
            mensaje: "Sí se encontró el proyecto",
            proyecto: proyecto
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "proyecto no encontrado",
            proyecto: {}
        })
    }
})
//Se crea un proyecto nuevo
app.post('/socios/v1/proyectos',(req,res)=>{

    const{ nombre, descripcion, fechaFin, fechaInicio}= req.body;

    const id = Math.round(Math.random()*1000);
    if(nombre==undefined || descripcion== undefined || fechaInicio== undefined || fechaFin== undefined){
        res.status(400).json({
            estado: 0,
            mensaje:"Faltan parametros a la solicitud"
        })

    }else{
        const nuevoProyecto={id:id, nombre:nombre, descripcion:descripcion, fechaInicio:fechaInicio, fechaFin:fechaFin};
        const longitudInicial = proyectos.length;
        console.log(proyectos.length);
        console.log(longitudInicial);
        proyectos.push(nuevoProyecto)
        if(proyectos.length>longitudInicial){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "proyecto creado",
                nuevoProyecto: nuevoProyecto
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"

            })
        }
        
    } 
    
})
//Se actualiza un comentario
app.put('/socios/v1/proyectos/:id',(req,res)=>{

    const{ id}=req.params;
    const{ nombre, descripcion, fechaInicio, fechaFin}= req.body;
    if(nombre==undefined||descripcion==undefined || fechaInicio==undefined || fechaFin==undefined){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =proyectos.findIndex(proyecto=>proyecto.id==id)
        if(posActualizar!= -1){

            proyectos[posActualizar].nombre=nombre;
            proyectos[posActualizar].descripcion=descripcion;
            proyectos[posActualizar].fechaInicio=fechaInicio;
            proyectos[posActualizar].fechaFin=fechaFin;
            res.status(200).json({
                estado:1,
                mensaje:"Comentario actualizado",
                proyectos:proyectos[posActualizar]
            })
        }else{

            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
//Se elimina un comentario
app.delete('/socios/v1/proyectos/:id',(req,res)=>{

    const{ id }= req.params;
    const indiceEliminar= proyectos.findIndex(proyecto=>proyecto.id==id)
    if(indiceEliminar!=-1){
        proyectos.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"proyecto eliminado con exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

//--------------------------CRUD Tareas------------------------------------------------------------
//Se genera la consulta de todas las Tareas

app.get('/socios/v1/tareas',(req,res)=>{
    if(tareas){
        res.status(200).json({
            estado:1,
            mensaje:"Existen tareas",
            tareas: tareas
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron tareas",
        tareas: tareas
    })
    }
})
//Consultar todas las tareas de un proyecto en específico

app.get('/socios/v1/proyectos/:id/tareas', (req, res) => {
    const idProyecto = parseInt(req.params.id);

    // Encuentra el proyecto por su ID
    const proyecto = proyectos.find(proyecto => proyecto.id === idProyecto);

    if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado"
        });
        return;
    }

    // Obtiene las tareas relacionadas al proyecto
    const tareasProyecto = tareas.filter(tarea => tarea.idProyecto === idProyecto);

    res.status(200).json({
        estado: 1,
        mensaje: "Tareas relacionadas al proyecto",
        tareas: tareasProyecto
    });
});

//Consultar todas las tareas de un proyecto en específico terminadas 

app.get('/socios/v1/proyectos/:id/tareasTerminadas', (req, res) => {
    const idProyecto = parseInt(req.params.id);

    // Encuentra el proyecto por su ID
    const proyecto = proyectos.find(proyecto => proyecto.id === idProyecto);

    if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado"
        });
        return;
    }

    // Obtiene las tareas relacionadas al proyecto
    const tareasTerminadasProyecto = tareas.filter(tarea => tarea.idProyecto === idProyecto && tarea.estadoTarea===1);

    res.status(200).json({
        estado: 1,
        mensaje: "Tareas relacionadas al proyecto",
        tareas: tareasTerminadasProyecto
    });
});


//Consultar todas las tareas de un proyecto en específico Pendientes

app.get('/socios/v1/proyectos/:id/tareasPendientes', (req, res) => {
    const idProyecto = parseInt(req.params.id);

    // Encuentra el proyecto por su ID
    const proyecto = proyectos.find(proyecto => proyecto.id === idProyecto);

    if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado"
        });
        return;
    }

    // Obtiene las tareas relacionadas al proyecto pendientes
    const tareasTerminadasProyecto = tareas.filter(tarea => tarea.idProyecto === idProyecto && tarea.estadoTarea===0);

    res.status(200).json({
        estado: 1,
        mensaje: "Tareas relacionadas al proyecto",
        tareas: tareasTerminadasProyecto
    });
});
 //Consultar todas las tareas de un proyecto en específico segun su fecha asignada
 app.get('/socios/v1/proyectos/:id/:fechaAsign', (req, res) => {
    const idProyecto = parseInt(req.params.id);
    const Fecha=req.params.fechaAsign;

    // Encuentra el proyecto por su ID
    const proyecto = proyectos.find(proyecto => proyecto.id === idProyecto);

    if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado"
        });
        return;
    }

    // Obtiene las tareas relacionadas al proyecto pendientes
    const tareasFecha = tareas.filter(tarea => tarea.idProyecto === idProyecto && tarea.fechaAsign===Fecha);

    if (!tareasFecha) {
        res.status(404).json({
            estado: 0,
            mensaje: "No hay tareas asignadas en esa fecha"
        });
        return;
    }
    res.status(200).json({
        estado: 1,
        mensaje: "Tareas relacionadas al proyecto",
        tareas: tareasFecha
    });
});
// se consultan las tareas deun prollecto en especifico  ademas de 
//colocarse en páginas y seleccionar cuantas por paj
app.get('/socios/v1/proyectos/:id_proyecto/tareasPag', (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    const pagina = req.query.pagina; // Obtener el número de página
    const cantidad = req.query.cantidad; // Obtener la cantidad de registros por página
    
    // Calcula índice inicial y final para la paginación
    const inicio = (pagina - 1) * cantidad;
    const fin = pagina * cantidad;
    
    const tareasProyecto = tareas.filter(tarea => tarea.idProyecto == id_proyecto);

    if (tareasProyecto.length > 0) {
        const tareasPaginadas = tareasProyecto.slice(inicio, fin);
        
        res.status(200).json({
            estado: 1,
            mensaje: "Estas son las taras que pertenecen al proyecto separadas por página",
            tareas: tareasPaginadas
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "El proyecto no cuenta con tareas"
        })
    }
});



//Consulta de un comentario en específico
app.get('/socios/v1/tareas/:id', (req, res) => {
    const id = req.params.id;
    const tarea = tareas.find(tarea => tarea.id == id); //se ahorra el for
    if (tarea) {
        res.status(200).json({
            estado: 1,
            mensaje: "Sí se encontró el tarea",
            tarea: tarea
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "tarea no encontrado",
            tarea: {}
        })
    }
})
//Se crea una tarea nueva
app.post('/socios/v1/tareas',(req,res)=>{

    const{ idProyecto, nombre, descripcion, fechaAsign, estadoTarea}= req.body;

    const id = Math.round(Math.random()*1000);
    if(idProyecto==undefined||nombre==undefined || descripcion== undefined || fechaAsign== undefined || estadoTarea== undefined){
        res.status(400).json({
            estado: 0,
            mensaje:"Faltan parametros a la solicitud"
        })

    }else{
        const nuevoTarea={id:id,idProyecto:idProyecto, nombre:nombre, descripcion:descripcion, fechaAsign:fechaAsign, estadoTarea:estadoTarea};
        const longitudInicial = tareas.length;
        console.log(tareas.length);
        console.log(longitudInicial);
        tareas.push(nuevoTarea)
        const proyecto = proyectos.find(proyecto => proyecto.id === idProyecto);
        if(tareas.length>longitudInicial && proyecto){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "Tarea creada y asignada a un proyecto",
                nuevoTarea: nuevoTarea
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "El no existe proyecto con ese id"

            })
        }
        
    } 
    
})
//Se actualiza una tarea
app.put('/socios/v1/tareas/:id',(req,res)=>{

    const{ id}=req.params;
    const{idProyecto, nombre, descripcion, fechaAsign, estadoTarea}= req.body;
    if(idProyecto==undefined||nombre==undefined || descripcion== undefined || fechaAsign== undefined || estadoTarea== undefined){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =tareas.findIndex(tarea=>tarea.id==id)
        if(posActualizar!= -1){
            tareas[posActualizar].idProyecto=idProyecto;
            tareas[posActualizar].nombre=nombre;
            tareas[posActualizar].descripcion=descripcion;
            tareas[posActualizar].fechaAsign=fechaAsign;
            tareas[posActualizar].estadoTarea=estadoTarea;
            res.status(200).json({
                estado:1,
                mensaje:"Tarea actualizada",
                tareas:tareas[posActualizar]
            })
        }else{

            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
//Se elimina una tarea
app.delete('/socios/v1/tareas/:id',(req,res)=>{

    const{ id }= req.params;
    const indiceEliminar= tareas.findIndex(tarea=>tarea.id==id)
    if(indiceEliminar!=-1){
        tareas.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"tarea eliminada con exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

app.listen(puerto,()=>{
console.log(('servidor corriendo en el puerto', puerto));
})