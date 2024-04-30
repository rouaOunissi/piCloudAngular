import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfIssueComponent } from './list-of-issue.component';

describe('ListOfIssueComponent', () => {
  let component: ListOfIssueComponent;
  let fixture: ComponentFixture<ListOfIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
