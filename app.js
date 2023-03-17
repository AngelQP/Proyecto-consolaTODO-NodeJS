require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  inquirerMenu, 
  pausa, 
  leerInput,
  listTasksDelete,
  confirm ,
  showListChecklist
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

const main = async() => {

  console.clear();
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = leerDB();

  if(tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch(opt){
      case '1':
        //crear opcion
        const desc = await leerInput('Descripción:');
        tasks.createTask(desc);
        break;
      
      case '2':
        tasks.listComplete();
        break;

      case '3': // listar completadas
        tasks.listPendientComplete();
        break;

      case '4': // listar pendientes
        tasks.listPendientComplete(false);
        break;
      
      case '5':
        const ids = await showListChecklist(tasks.listadoArr); 
        tasks.toggleCompletes(ids);
        break;
      
      case '6': // Borrar
        const id = await listTasksDelete(tasks.listadoArr);
        if(id !== '0') {
          const ok = await confirm('¿Estás seguro?')
          
          if(ok) {
            tasks.deleteTask(id);
            console.log('Tarea borrada');
          }
        }
    } 

    guardarDB(tasks.listadoArr);

    await pausa();

  } while (opt !== '0');

}

main();