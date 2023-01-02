import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaItemComponent } from './posta-item.component';

describe('PostaItemComponent', () => {
  let component: PostaItemComponent;
  let fixture: ComponentFixture<PostaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
