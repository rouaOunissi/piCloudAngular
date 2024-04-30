import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentCleanupService {

  constructor(private http: HttpClient) { }

  startCleanupProcess() {
    // Run the cleanup process every 2 minutes
    interval(120000).pipe(
      switchMap(() => this.fetchComments())
    ).subscribe(comments => {
      this.processComments(comments);
    });
  }

  fetchComments() {
    // Make an HTTP request to fetch comments
    return this.http.get<any[]>('http://localhost:8040/api/comment/allcomment');
  }

  processComments(comments: any[]) {
    comments.forEach(comment => {
      if (this.containsBadWord(comment.comment_details)) {
        this.deleteComment(comment.id_comment);
      }
    });
  }

  containsBadWord(text: string): boolean {
      return text.includes("****");

  }

  deleteComment(commentId: number) {
    // Make an HTTP request to delete the comment
    this.http.delete(` http://localhost:8040/api/comment/delete/${commentId}`).subscribe(
      () => console.log(`Comment ${commentId} deleted`),
      error => console.error(`Error deleting comment ${commentId}:`, error)
    );
  }
}
