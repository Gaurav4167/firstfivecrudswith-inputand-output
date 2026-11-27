import { Component, OnInit } from '@angular/core';
import { ItodoAPICall } from 'src/core/models/todo-api.model';
import { TodoApiCallService } from 'src/core/services/todoApiCall/todo-api-call.service';

@Component({
  selector: 'app-todo-parent',
  templateUrl: './todo-parent.component.html',
  styleUrls: ['./todo-parent.component.scss']
})
export class TodoParentComponent implements OnInit {

  edit_id !: string

  todosArr: ItodoAPICall[] = []
  constructor(private todoDataAPIService: TodoApiCallService) { }

  ngOnInit(): void {
    this.todoDataAPIService.fetchTodos()
      .subscribe({
        next: (data) => {
          this.todosArr = data
        },
        error: err => {
          console.log(err)
        }
      })
  }

  newTodo(newTodo: ItodoAPICall) {
    this.todoDataAPIService.craeteTodo(newTodo)
      .subscribe({
        next: data => {
          this.todosArr.unshift(newTodo)
        },
        error: err => {
          console.log(err)
        }
      })
  }

  updatedTodo(updatedTodo: ItodoAPICall) {
    this.todoDataAPIService.updateTodo(updatedTodo.id, updatedTodo)
      .subscribe({
        next: data => {
          let getIndex = this.todosArr.findIndex(ele => ele.id === updatedTodo.id)
          this.todosArr[getIndex] = updatedTodo
        },
        error: err => {
          console.log(err)
        }
      })
  }

  deleteTodo(deleteId: string) {
    this.todoDataAPIService.deleteTodo(deleteId)
      .subscribe({
        next: data => {
          let getIndex = this.todosArr.findIndex(ele => ele.id === deleteId)
          this.todosArr.splice(getIndex, 1)
        }
        ,
        error: err => {
          console.log(err)
        }
      })
  }


}
