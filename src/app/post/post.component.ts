import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../posts.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/environments/interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  post$: Observable<Post> = this.route.params
  .pipe(switchMap((params: Params) => {
    return this.postsService.getById(params['id']);
  }))


  constructor(private route: ActivatedRoute,
    private postsService: PostsService) {}

}
