import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../posts.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor (
    private postsService: PostsService,
    private router: Router
    ) {}
  
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required)
  });

  submit() {
    if (this.form.invalid){
      return;
    }

    const post: any = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      // date: new Date()
      
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/posts']);
    });
  };

}
