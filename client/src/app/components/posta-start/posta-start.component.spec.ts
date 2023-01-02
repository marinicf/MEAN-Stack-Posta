import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaStartComponent } from './posta-start.component';

describe('PostaStartComponent', () => {
  let component: PostaStartComponent;
  let fixture: ComponentFixture<PostaStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostaStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
