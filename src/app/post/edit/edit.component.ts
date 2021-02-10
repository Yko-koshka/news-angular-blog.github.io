import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Post } from 'src/environments/interface';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  });

  uSub!: Subscription;
  id = 0;

  constructor(
    public route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      this.id = params['id'];
      return this.postsService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.form.patchValue({        
        title:post.title,
        text: post.text,
        author:post.author
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

    this.uSub = this.postsService.update({
      id: this.id,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.form.value.author
    }).subscribe(() => {
      this.router.navigate(['/posts']);
    })
  }

}
