import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Console } from 'console';
import { title } from 'process';
import { Ipost } from 'src/core/models/posts.model';
import { PostsDataService } from 'src/core/services/posts-data.service';
import { SnackBarService } from 'src/core/services/snack-bar.service';
import { UuIdServiceService } from 'src/core/services/uu-id-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postArr: Ipost[] = []
  isInEditMode: boolean = false
  edit_id !: string
  @ViewChild('titleRef') titleRef !: ElementRef<HTMLInputElement>
  @ViewChild('contentRef') contentRef !: ElementRef<HTMLInputElement>

  constructor(private _postService: PostsDataService,
    private _uuId: UuIdServiceService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this._postService.fetchPosts()
      .subscribe({
        next: (data) => {
          this.postArr = data
        },

        error: (err) => {
          console.log(err)
        }
      })
  }

  onAddNewPost() {
    let newPost: Ipost = {
      title: this.titleRef.nativeElement.value,
      body: this.contentRef.nativeElement.value,
      id: this._uuId.uniqueId()
    }

    this._postService.createNewPost(newPost)
      .subscribe({
        next: data => {
          this.postArr.unshift(newPost)
          this.titleRef.nativeElement.value = ''
          this.contentRef.nativeElement.value = ''
          this._snackBar.showSnackbar("Post created successfully!!!")

        },
        error: err => {
          console.log(err)
        }
      })
  }

  onEditPost(post: Ipost) {
    this.isInEditMode = true
    this.edit_id = post.id
    this.titleRef.nativeElement.value = post.title
    this.contentRef.nativeElement.value = post.body
  }

  onUpdatePost() {

    let updatedPost: Ipost = {

      title: this.titleRef.nativeElement.value,
      body: this.contentRef.nativeElement.value,
      id: this.edit_id
    }
    this._postService.updatePost(this.edit_id, updatedPost)
      .subscribe({
        next: data => {
          let getIndex = this.postArr.findIndex(ele => ele.id === this.edit_id)
          this.postArr[getIndex] = updatedPost
          this.isInEditMode = false
          this.edit_id = ''
          this.titleRef.nativeElement.value = ''
          this.contentRef.nativeElement.value = ''
          this._snackBar.showSnackbar("Post updated successfully!!!")

        },

        error: err => {
          console.log(err)
        }
      })
  }

  ondeletePost(deleteId: string) {
    let confirmation = confirm("Are you sure, Want to delete this post")
    if (confirmation) {
      this._postService.deletePost(deleteId)
        .subscribe({
          next: data => {
            let getIndex = this.postArr.findIndex(ele => ele.id === deleteId)
            this.postArr.splice(getIndex, 1)
            this._snackBar.showSnackbar("Post deleted successfully!!!")

          },
          error: err => {
            console.log(err)
          }
        })
    }
  }
}
