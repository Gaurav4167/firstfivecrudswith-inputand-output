import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { title } from 'process';
import { ItodoAPICall } from 'src/core/models/todo-api.model';
import { UuIdServiceService } from 'src/core/services/uu-id-service.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-todo-child',
  templateUrl: './todo-child.component.html',
  styleUrls: ['./todo-child.component.scss']
})
export class TodoChildComponent implements OnInit {

  @ViewChild('titleRef') titleRef !: ElementRef<HTMLInputElement>
  @ViewChild('isCompltedRef') isCompltedRef !: ElementRef<HTMLInputElement>
  isInEditMode: boolean = false
  edit_id: string = ''
  @Input() todosArr !: ItodoAPICall[]

  @Output() newTodoEmitter: EventEmitter<ItodoAPICall> = new EventEmitter<ItodoAPICall>()
  @Output() updatedTodoEmitter : EventEmitter<ItodoAPICall> = new EventEmitter<ItodoAPICall>()
  @Output() deleteTodoEmitter : EventEmitter<string> = new EventEmitter<string>()
  constructor(private _uuidService: UuIdServiceService) { }

  ngOnInit(): void {

  }

  addNewTodo() {
    let newTodo = {
      id: this._uuidService.uniqueId(),
      title: this.titleRef.nativeElement.value,
      completed: this.isCompltedRef.nativeElement.value === 'yes' ? true : false
    }

    this.titleRef.nativeElement.value = ''
    this.isCompltedRef.nativeElement.value = 'yes'

    this.newTodoEmitter.emit(newTodo)
  }

  editTodo(editTodo: ItodoAPICall) {
    this.isInEditMode = true
    this.edit_id = editTodo.id
    this.titleRef.nativeElement.value = editTodo.title
    this.isCompltedRef.nativeElement.value = editTodo.completed ? 'yes' : 'no'
  }

  updateTodo() {
    let updatedTodoObject : ItodoAPICall = {
      id: this.edit_id,
      title: this.titleRef.nativeElement.value,
      completed: this.isCompltedRef.nativeElement.value === 'yes' ? true : false
    }

    this.updatedTodoEmitter.emit(updatedTodoObject)
    this.isInEditMode = false
    this.titleRef.nativeElement.value = ''
    this.isCompltedRef.nativeElement.value = 'yes'
  }

  deleteTodo(deleteId : string){
    this.deleteTodoEmitter.emit(deleteId)
  }
}
