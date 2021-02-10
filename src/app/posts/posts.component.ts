import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { Subscription } from 'rxjs';
import { Post } from 'src/environments/interface';
import { PostsService } from '../posts.service';
import { ViewEncapsulation } from '@angular/core'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostsComponent implements OnInit {

  posts: Post[] = [];
  pSub: Subscription = new Subscription;
  dSub: Subscription = new Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: number) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    })
  }
  
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

}
