import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { StudentComponent } from './features/student/student.component';
import { TodoComponent } from './features/todo/todo.component';
import { PostsComponent } from './features/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoParentComponent } from './features/todoApi/todo-parent/todo-parent.component';
import { TodoChildComponent } from './features/todoApi/todo-child/todo-child.component';
import { ProductDashboardComponent } from './features/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './features/product-form/product-form.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TodoComponent,
    PostsComponent,
    TodoParentComponent,
    TodoChildComponent,
    ProductDashboardComponent,
    ProductFormComponent,
    ProductListComponent,
    
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
