import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComponentComponent } from './issue-component.component';

describe('IssueComponentComponent', () => {
  let component: IssueComponentComponent;
  let fixture: ComponentFixture<IssueComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
