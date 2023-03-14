require('colors');

const { 
  inquirerMenu, 
  pausa, 
  leerInput 
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

const main = async() => {

  let opt = '';
  const tasks = new Tasks();

  do {
    opt = await inquirerMenu();

    switch(opt){
      case '1':
        //crear opcion
        const desc = await leerInput('Descripción:');
        tasks.createTask(desc);
        break;
      
      case '2':
        console.log(tasks._listado);
        break;
    }

    await pausa();

  } while (opt !== '0');

}

main();