import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllCommentComponent } from './display-all-comment.component';

describe('DisplayAllCommentComponent', () => {
  let component: DisplayAllCommentComponent;
  let fixture: ComponentFixture<DisplayAllCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAllCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
