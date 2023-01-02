import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaDetailComponent } from './posta-detail.component';

describe('PostaDetailComponent', () => {
  let component: PostaDetailComponent;
  let fixture: ComponentFixture<PostaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
