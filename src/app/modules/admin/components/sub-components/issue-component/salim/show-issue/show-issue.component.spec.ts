import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIssueComponent } from './show-issue.component';

describe('ShowIssueComponent', () => {
  let component: ShowIssueComponent;
  let fixture: ComponentFixture<ShowIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
