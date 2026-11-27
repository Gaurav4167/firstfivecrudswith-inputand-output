import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItodoAPICall } from 'src/core/models/todo-api.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiCallService {

  base_url = `https://jsonplaceholder.typicode.com/`;
  post_url  = `${this.base_url}/todos`

  constructor(private _http : HttpClient) { }

   fetchTodos() : Observable<ItodoAPICall[]> {
    return this._http.get<ItodoAPICall[]>(this.post_url)
  }

  craeteTodo(newTodo : ItodoAPICall): Observable<ItodoAPICall>{
    return this._http.post<ItodoAPICall>(this.post_url, newTodo)
  }

  updateTodo(id : string, updatedTodo : ItodoAPICall) : Observable<ItodoAPICall>{
    return this._http.patch<ItodoAPICall>(`${this.post_url}/${id}`, updatedTodo)
  }

  deleteTodo(id : string) : Observable<ItodoAPICall>{
    return this._http.delete<ItodoAPICall>(`${this.post_url}/${id}`)
  }
  
}
