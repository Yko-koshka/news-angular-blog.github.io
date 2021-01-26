import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

// const routes: Routes = [
//   {path: 'posts', component: PostsComponent},
//   {path: 'post/:id', component: PostComponent},
//   { path: '',   redirectTo: '/posts', pathMatch: 'full' },
// ];

const routes: Routes = [
  { path: '',   redirectTo: '/posts', pathMatch: 'full' },
  {path: 'posts', component: PostsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'post/:id/edit', component: EditComponent},
  // { path: '',   redirectTo: '/posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
