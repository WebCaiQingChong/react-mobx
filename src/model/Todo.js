import { observable, action, configure } from 'mobx'
// don't allow state modifications outside actions
configure({enforceActions: true})
export default class Todo {
  @observable todoList = []
  
  @action
  add (todos) {
    this.todoList.push(todos)
  }
  delete (index) {
    this.todoList.slice(index, 1)
  }
}
