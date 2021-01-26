import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/environments/interface';
import { PostsService } from '../posts.service';
import { ViewEncapsulation } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  posts: Post[] = [];
  pSub: Subscription = new Subscription;
  dSub: Subscription = new Subscription;
  public pageSlice = this.posts.slice(0, 3);

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: number) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }

  onPageChange(event: PageEvent) {
    console.log(event)
    
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }

    this.pageSlice = this.posts.slice(startIndex, endIndex);

  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }

    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
