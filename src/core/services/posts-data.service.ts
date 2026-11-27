import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ipost } from "../models/posts.model";

@Injectable({
    providedIn : "root"
})
export class PostsDataService {

    BASE_URL : string = 'https://jsonplaceholder.typicode.com/'
    POSTS_URL : string  = `${this.BASE_URL}/posts`

    constructor( private _http : HttpClient ){

    }

    fetchPosts() : Observable<Ipost[]>{
        return this._http.get<Ipost[]>(this.POSTS_URL)
    }

    createNewPost(newPost : Ipost): Observable<Ipost>{
        return this._http.post<Ipost>(this.POSTS_URL, newPost)
    }

    updatePost(id : string, updatedPost : Ipost) : Observable<Ipost>{
        return this._http.patch<Ipost>(`${this.POSTS_URL}/${id}`, updatedPost)
    }

    deletePost(id : string) : Observable<Ipost>{
        return this._http.delete<Ipost>(`${this.POSTS_URL}/${id}`)
    }

    
}

