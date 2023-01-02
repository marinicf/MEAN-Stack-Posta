import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaListComponent } from './posta-list.component';

describe('PostaListComponent', () => {
  let component: PostaListComponent;
  let fixture: ComponentFixture<PostaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
