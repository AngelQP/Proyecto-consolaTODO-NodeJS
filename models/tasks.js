/* *
  * _listado:
  *     {'uuid-1223232-2465697-2: {id: 12, desc:asd, completadoEn:92331 } }, 

*/

const Task = require("./task");
require('colors');

class Tasks {

  _listado = {};

  get listadoArr () {
    
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const task = this._listado[key];
      listado.push(task);
    })

    return listado;

  }

  constructor() {
    this._listado = {};
  }

  deleteTask(id = '') {
    
    if( this._listado[id] ) {
      delete this._listado[id];
    }

  }

  loadTasksFromArray ( tasks = [] ) {

    tasks.forEach(task => {
      this._listado[task.id] = task;
    })
  }

  createTask( desc= '') {

    const task = new Task(desc);
    this._listado[task.id] = task;
  }

  listComplete() {

    console.log();
    
    this.listadoArr.forEach((list, index) => {

      const indice = index + 1 + '.';

      console.log(`${indice.green} ${list.desc} :: ${list.completadoEn ? 'Completada'.green  : 'Pendiente'.red } `)

    })

  }

  listPendientComplete ( complete = true) {

    console.log();

    const listado = this.listadoArr.filter( task  => {
      const estado = (task.completadoEn) ? true : false;
      return estado === complete;
    })

    listado.forEach((list, indice) => {
      const idx = `${indice + 1 + '.'}`.green;
      const {desc, completadoEn} = list;
      const estado = (completadoEn) ? `${completadoEn}`.green : 'Pendiente'.red
      console.log(`${idx} ${desc} :: ${estado}`);
    })

  }

  toggleCompletes(ids = []) {

    ids.forEach( id => {

      const task = this._listado[id];
      if( !task.completadoEn ) {
        task.completadoEn = new Date().toISOString();
      }

    });

    this.listadoArr.forEach( task => {

      if( !ids.includes(task.id) ){
        this._listado[task.id].completadoEn = null;
      }

    })

  }

}

module.exports = Tasks;