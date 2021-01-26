import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators'
import { Post } from 'src/environments/interface';
import { PostsService } from '../posts.service';

const post: Post = {
  title: '',
  img: '',
  text: '',
  author: '',
  id: 0,
};

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy{
  form: FormGroup;

  // id = null;

  post: Post = post;
  submitted = false;
  uSub!: Subscription;

  id$: Observable<any> = this.route.paramMap.pipe(
    filter((route: any) => !!route.params.id),
    map((route: any) => route.params.id)
    );

  constructor(
    public route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl(post.title, Validators.required),
      text: new FormControl(post.text, Validators.required),
      author: new FormControl(post.author, Validators.required),
    })
  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.postsService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl(post.author, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit(){
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.form.value.author
    }).subscribe(() => {
      this.submitted = false
      this.router.navigate(['/posts'])
    })
  }

}
