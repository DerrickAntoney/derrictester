import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
    <div>
      <h2>Create New Post</h2>
      <form (ngSubmit)="submitPost()">
        <div>
          <label for="title">Title:</label>
          <input id="title" [(ngModel)]="title" name="title" required />
        </div>
        <div>
          <label for="body">Body:</label>
          <textarea id="body" [(ngModel)]="body" name="body" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p *ngIf="successMessage">{{ successMessage }}</p>
      <p *ngIf="errorMessage">{{ errorMessage }}</p>
    </div>
  `,
  styles: ``
})
export class CreatePostComponent {
  userId: string | null = null;
  title: string = '';
  body: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  submitPost() {
    if (this.userId) {
      const newPost = {
        userId: this.userId,
        title: this.title,
        body: this.body
      };
      this.http.post('https://jsonplaceholder.typicode.com/posts', newPost).subscribe({
        next: () => {
          this.successMessage = 'Post created successfully!';
          setTimeout(() => this.router.navigate([`/user/${this.userId}`]), 2000);
        },
        error: () => this.errorMessage = 'Failed to create post'
      });
    }
  }
}
