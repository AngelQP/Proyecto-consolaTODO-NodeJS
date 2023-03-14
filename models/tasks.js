/* *
  * _listado:
  *     {'uuid-1223232-2465697-2: {id: 12, desc:asd, completadoEn:92331 } }, 

*/

const Task = require("./task");

class Tasks {

  _listado = {};

  constructor() {
    this._listado = {};
  }

  createTask( desc= '') {

    const task = new Task(desc);

    this._listado[task.id] = task;

  }

}

module.exports = Tasks;