import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/core/models/todo.model';
import { todoArr } from 'src/core/services/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @ViewChild('todoItemRef') todoItemRef !: ElementRef<HTMLInputElement>
  @ViewChild('isCompletedRef') isCompletedRef !: ElementRef<HTMLInputElement>
  @ViewChild('checkboxRef') checkboxRef !: ElementRef<HTMLInputElement>


  isInEditMode: boolean = false
  edit_id !: string
  todos: Itodo[] = todoArr
  constructor() { }

  onAddnewTodo() {
    let newTodo: Itodo = {
      id: String(crypto.randomUUID()),
      todoItem: this.todoItemRef.nativeElement.value,
      isCompleted: this.isCompletedRef.nativeElement.value == 'yes' ? true : false
    }

    this.todos.unshift(newTodo)

    this.todoItemRef.nativeElement.value = ''
    this.isCompletedRef.nativeElement.value = ''

  }

  onEditTodo(todo: Itodo) {
    this.isInEditMode = true
    this.todoItemRef.nativeElement.value = todo.todoItem
    this.isCompletedRef.nativeElement.value = todo.isCompleted === true ? 'yes' : 'no'

    this.edit_id = todo.id
  }

  onUpdateTodo() {
    let updatedTodo: Itodo = {
      id: this.edit_id,
      todoItem: this.todoItemRef.nativeElement.value,
      isCompleted: this.isCompletedRef.nativeElement.value == 'yes' ? true : false
    }

    let getIndex = this.todos.findIndex(ele => ele.id === this.edit_id)
    this.todos[getIndex] = updatedTodo

    this.todoItemRef.nativeElement.value = ''
    this.isCompletedRef.nativeElement.value = ''
    this.edit_id = ''
    this.isInEditMode = false
  }

  onDeleteTodo(deleteId: string) {
    let getIndex = this.todos.findIndex(ele => ele.id === deleteId)
    this.todos.splice(getIndex, 1)
  }

  onChangeChecked(todo: Itodo, eve: Event) {

    let getIndex = this.todos.findIndex(ele => ele.id === todo.id)

    const isChecked = (eve.target as HTMLInputElement).checked
    this.todos[getIndex].isCompleted = isChecked

    console.log(this.todos)
  }

  ngOnInit(): void {
  }

}
